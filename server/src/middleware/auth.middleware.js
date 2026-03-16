// server/src/middleware/auth.middleware.js
const { ClerkExpressWithAuth, clerkClient } = require('@clerk/clerk-sdk-node');
const User = require('../models/User.model');

// Step 1: Clerk validates the Bearer token
// Reads Authorization: Bearer <token> from request header
// Attaches req.auth = { userId: clerkId, ... } if valid
// Does NOT block — always calls next()
const clerkAuth = ClerkExpressWithAuth();

// Step 2: Use req.auth.userId to find/create MongoDB user
const attachMongoUser = async (req, res, next) => {
  try {
    const clerkId = req.auth?.userId;

    // If Clerk found no valid session, userId will be null
    if (!clerkId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Try to find existing MongoDB user by clerkId
    let user = await User.findOne({ clerkId });

    if (!user) {
      // User exists in Clerk but not in MongoDB yet
      // Fetch their details from Clerk and create a record
      try {
        const clerkUser = await clerkClient.users.getUser(clerkId);

        const primaryEmail = clerkUser.emailAddresses
          .find(e => e.id === clerkUser.primaryEmailAddressId)
          ?.emailAddress || '';

        const fullName = [clerkUser.firstName, clerkUser.lastName]
          .filter(Boolean)
          .join(' ')
          .trim();

        // Check if a legacy user exists with this email
        // (migrating from old OTP system)
        user = await User.findOne({ email: primaryEmail });

        if (user) {
          // Link existing user to Clerk
          user.clerkId = clerkId;
          await user.save();
        } else {
          // Brand new user — create minimal record
          user = await User.create({
            clerkId,
            email: primaryEmail,
            name: fullName || primaryEmail.split('@')[0],
            role: 'participant',
            isProfileComplete: false,
          });
        }
      } catch (clerkErr) {
        console.error('[Auth] Failed to fetch Clerk user:', clerkErr.message);
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }

    // Attach MongoDB user to request
    // All controllers use req.user._id for MongoDB queries
    req.user = user;
    next();

  } catch (err) {
    console.error('[Auth] Middleware error:', err.message);
    return res.status(500).json({ message: 'Authentication error' });
  }
};

// Admin check — use AFTER protect
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// protect = array of two middleware functions
// Usage: router.get('/route', protect, controller)
const protect = [clerkAuth, attachMongoUser];

module.exports = { protect, adminOnly, clerkAuth };

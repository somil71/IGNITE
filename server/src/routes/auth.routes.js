const router = require('express').Router();
const { getMe, completeProfile, registerFCMToken } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/me', protect, getMe);
router.patch('/complete-profile', protect, completeProfile);
router.post('/fcm-token', protect, registerFCMToken);

// TODO: Remove before production — debug route for auth verification
router.get('/test', protect, (req, res) => {
  res.json({
    status: 'Auth pipeline working',
    mongoId: req.user._id,
    clerkId: req.user.clerkId,
    email: req.user.email,
    role: req.user.role,
    isProfileComplete: req.user.isProfileComplete,
  });
});

module.exports = router;

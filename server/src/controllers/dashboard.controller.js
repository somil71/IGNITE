const Registration = require('../models/Registration.model');
const Payment = require('../models/Payment.model');
const User = require('../models/User.model');
const { formatDistanceToNow } = require('date-fns');

exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // STEP 1: PARALLEL FETCH - SINGLE TRIP TO DB FOR CORE DATA
    const [userDoc, registrations] = await Promise.all([
      User.findById(userId).lean(),
      Registration.find({ visibleToUsers: userId })
        .populate('eventId', 'title slug category registrationFee whatsappGroupLink bannerImage')
        .sort({ createdAt: -1 })
        .lean()
    ]);

    if (!userDoc) return res.status(404).json({ message: 'User not found' });

    // STEP 2: BULK PAYMENT FETCH - ELIMINATE N+1 QUERIES
    const registrationIds = registrations.map(r => r._id);
    const payments = await Payment.find({ registrationId: { $in: registrationIds } }).lean();

    // STEP 3: O(1) LOOKUP MAP
    const paymentMap = {};
    payments.forEach(p => {
      paymentMap[p.registrationId.toString()] = p;
    });

    // STEP 4: ASSEMBLE ENRICHED REGISTRATIONS
    const enriched = registrations.map(reg => {
      const payment = paymentMap[reg._id.toString()] || null;
      return {
        ...reg,
        payment,
        isLeader: reg.userId.toString() === userId.toString() // For "TEAM MEMBER" badge logic
      };
    });

    // STEP 5: DYNAMIC NOTIFICATIONS (No extra DB calls)
    const notifications = [
      { 
        id: 'welcome', 
        type: 'SYSTEM', 
        message: 'Welcome to IGNITE 2026! Your secure portal is active.', 
        timestamp: userDoc.createdAt
      }
    ];

    enriched.forEach(r => {
      const eventName = r.eventId?.title || 'an event';
      const timestamp = r.updatedAt || r.createdAt;
      
      if (r.status === 'confirmed') {
        notifications.push({
          id: `conf-${r._id}`, 
          type: 'CONFIRMED', 
          message: `Your registration for ${eventName} is verified. Welcome aboard!`, 
          timestamp 
        });
      } else if (r.status === 'rejected') {
        notifications.push({
          id: `rej-${r._id}`, 
          type: 'REJECTED', 
          message: `Action Required: Registration for ${eventName} was rejected. Reason: ${r.adminNote || 'Contact support.'}`, 
          timestamp 
        });
      } else if (r.payment?.paymentStatus === 'time_exceeded') {
        notifications.push({
          id: `time-${r._id}`, 
          type: 'WARNING', 
          message: `Payment window exceeded for ${eventName}. Our team is reviewing the capture.`, 
          timestamp: r.payment.updatedAt
        });
      }
    });

    // Sort notifications by time
    notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // STEP 6: RETURN PERFORMANCE-READY RESPONSE
    res.json({
      user: {
        _id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        phone: userDoc.phone,
        collegeType: userDoc.collegeType,
        collegeName: userDoc.collegeName,
        course: userDoc.course,
        year: userDoc.year,
        isProfileComplete: userDoc.isProfileComplete,
      },
      registrations: enriched,
      notifications,
      stats: {
        total: registrations.length,
        confirmed: registrations.filter(r => r.status === 'confirmed').length,
        pending: registrations.filter(r => r.status === 'pending').length,
      }
    });

  } catch (err) {
    next(err);
  }
};

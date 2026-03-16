const User = require('../models/User.model');
const Registration = require('../models/Registration.model');
const Payment = require('../models/Payment.model');
const Event = require('../models/Event.model');
const { broadcastNotification } = require('../services/firebase.service');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [users, registrations, payments, events] = await Promise.all([
      User.countDocuments({ role: 'participant' }),
      Registration.countDocuments(),
      Payment.countDocuments({ paymentStatus: 'verified' }),
      Event.countDocuments({ isActive: true }),
    ]);

    const pendingPayments = await Payment.countDocuments({ paymentStatus: 'uploaded' });
    const confirmedRegistrations = await Registration.countDocuments({ status: 'confirmed' });

    res.json({
      stats: {
        totalUsers: users,
        totalRegistrations: registrations,
        confirmedRegistrations,
        verifiedPayments: payments,
        pendingPayments,
        activeEvents: events,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.broadcastNotification = async (req, res, next) => {
  try {
    const { title, body, data } = req.body;
    if (!title || !body)
      return res.status(400).json({ message: 'Title and body are required' });

    await broadcastNotification(title, body, data || {});
    res.json({ message: 'Notification broadcast sent' });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const users = await User.find({ role: 'participant' })
      .select('-__v -fcmToken')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await User.countDocuments({ role: 'participant' });
    res.json({ users, total });
  } catch (err) {
    next(err);
  }
};

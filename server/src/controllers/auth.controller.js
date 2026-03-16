// server/src/controllers/auth.controller.js
const User = require('../models/User.model');

exports.getMe = async (req, res) => {
  // req.user is already attached by auth middleware
  // Just return it — no need to re-query
  res.json({ user: req.user });
};

exports.completeProfile = async (req, res) => {
  try {
    const {
      name, phone, courseLevel, collegeType,
      year, course, rollNumber, officialEmail,
      collegeName, studentIdCardUrl
    } = req.body;

    if (!name || !phone || !collegeType) {
      return res.status(400).json({ 
        message: 'Name, phone, and college type are required' 
      });
    }

    const updateData = {
      name, phone, courseLevel, collegeType,
      isProfileComplete: true
    };

    if (collegeType === 'IILM') {
      Object.assign(updateData, { year, course, rollNumber, officialEmail });
    } else {
      Object.assign(updateData, { collegeName, year, course, studentIdCard: studentIdCardUrl });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerFCMToken = async (req, res, next) => {
  try {
    const { fcmToken } = req.body;
    if (!fcmToken) return res.status(400).json({ message: 'FCM token required' });

    await User.findByIdAndUpdate(req.user._id, { fcmToken });
    res.json({ message: 'FCM token registered' });
  } catch (err) {
    next(err);
  }
};

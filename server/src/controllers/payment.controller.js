const Payment = require('../models/Payment.model');
const Registration = require('../models/Registration.model');
const { sendPaymentVerified } = require('../services/email.service');
const { sendPushNotification } = require('../services/firebase.service');
const User = require('../models/User.model');

exports.uploadPaymentProof = async (req, res, next) => {
  try {
    const { registrationId, paymentProofUrl, transactionId } = req.body;

    const payment = await Payment.findOneAndUpdate(
      { registrationId },
      {
        paymentProof: paymentProofUrl,
        transactionId,
        paymentStatus: 'uploaded',
      },
      { new: true, upsert: false }
    );

    if (!payment) {
      // Create payment record if it doesn't exist (for free events that got paid)
      return res.status(404).json({ message: 'Payment record not found' });
    }

    res.json({ message: 'Payment proof uploaded. Pending admin verification.', payment });
  } catch (err) {
    next(err);
  }
};

exports.reuploadPayment = async (req, res, next) => {
  try {
    const { paymentProofUrl, transactionId } = req.body;
    
    if (!paymentProofUrl || !transactionId) {
      return res.status(400).json({ message: 'Proof URL and Transaction ID are required' });
    }

    const payment = await Payment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, paymentStatus: 'rejected' },
      { paymentProof: paymentProofUrl, transactionId, paymentStatus: 'uploaded' },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found or not rejected' });
    }
    
    // Also reset registration status to pending
    await Registration.findByIdAndUpdate(payment.registrationId, { status: 'pending' });

    res.json({ message: 'Re-upload successful', payment });
  } catch (err) {
    next(err);
  }
};

exports.getMyPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
      .populate('eventId', 'title slug category')
      .populate('registrationId', 'registrationId')
      .sort({ createdAt: -1 });
    res.json({ payments });
  } catch (err) {
    next(err);
  }
};

exports.getAllPayments = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (status) filter.paymentStatus = status;

    const payments = await Payment.find(filter)
      .populate('userId', 'name email phone')
      .populate('eventId', 'title')
      .populate('registrationId', 'registrationId')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Payment.countDocuments(filter);
    res.json({ payments, total });
  } catch (err) {
    next(err);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { status, rejectionReason } = req.body; // 'verified' or 'rejected'

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: status,
        verifiedBy: req.user._id,
        verifiedAt: new Date(),
        rejectionReason: rejectionReason || '',
      },
      { new: true }
    ).populate('userId', 'name email fcmToken')
     .populate('eventId', 'title');

    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    // Update registration status if payment verified
    if (status === 'verified') {
      await Registration.findByIdAndUpdate(payment.registrationId, { status: 'confirmed' });

      // Send email notification
      try {
        await sendPaymentVerified(
          payment.userId.email, 
          payment.userId.name, 
          payment.eventId.title,
          payment.registrationId.registrationId
        );
      } catch (e) { console.error('Email error:', e.message); }

      // Send FCM push notification
      if (payment.userId.fcmToken) {
        try {
          await sendPushNotification(
            payment.userId.fcmToken,
            '✓ Payment Verified!',
            `Your registration for ${payment.eventId.title} is confirmed.`,
            { eventTitle: payment.eventId.title }
          );
        } catch (e) { console.error('FCM error:', e.message); }
      }
    }

    res.json({ message: `Payment ${status}`, payment });
  } catch (err) {
    next(err);
  }
};

exports.overridePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    
    if (payment.paymentStatus !== 'time_exceeded') {
      return res.status(400).json({ message: 'Payment is not in time_exceeded status.' });
    }

    payment.paymentStatus = 'uploaded';
    payment.timeExceeded = false;
    payment.adminOverrideBy = req.user._id;
    payment.adminOverrideAt = new Date();
    payment.adminOverrideNote = req.body.note || 'Admin rescue';
    
    await payment.save();

    res.json({ 
      success: true, 
      message: 'Payment window exceeded status cleared. Payment is now pending review.', 
      payment 
    });
  } catch (err) {
    next(err);
  }
};

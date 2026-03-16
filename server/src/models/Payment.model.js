const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    unique: true,
    index: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true
  },
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true,
    index: true
  },
  registrationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Registration',
    required: true,
    index: true
  },
  amount: { 
    type: Number, 
    required: true 
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'uploaded', 'verified', 'rejected', 'time_exceeded'],
    default: 'pending',
    index: true
  },
  paymentProofUrl: { type: String },
  transactionId: { type: String },
  
  // Timing Logic
  qrShownAt: { type: Date },
  proofUploadedAt: { type: Date },
  timeExceeded: { type: Boolean, default: false },
  minutesElapsed: { type: Number },

  // Admin Audit
  rejectionReason: { type: String, default: '' },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: { type: Date },
  
  // Rescue / Override
  adminOverrideBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  adminOverrideAt: { type: Date },
  adminOverrideNote: { type: String }
}, { timestamps: true });

// Auto-generate human-readable payment ID
paymentSchema.pre('save', async function (next) {
  if (!this.paymentId) {
    try {
      const count = await mongoose.model('Payment').countDocuments();
      this.paymentId = `PAY-2026-${String(count + 1).padStart(5, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Indexes
paymentSchema.index({ registrationId: 1, paymentStatus: 1 });

module.exports = mongoose.model('Payment', paymentSchema);

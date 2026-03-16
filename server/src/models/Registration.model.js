const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  inviteStatus: { 
    type: String, 
    enum: ['pending', 'joined'], 
    default: 'pending' 
  },
}, { _id: false });

const registrationSchema = new mongoose.Schema({
  registrationId: { 
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
  teamName: { 
    type: String, 
    trim: true 
  },
  teamMembers: [teamMemberSchema],
  visibleToUsers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
    index: true
  },
  participantDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: String, required: true },
    rollNumber: { type: String },
    officialEmail: { type: String },
    studentIdUrl: { type: String },
  },
  collegeType: { 
    type: String, 
    enum: ['IILM', 'OTHER'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending',
    index: true
  }
}, { timestamps: true });

// Auto-generate human-readable registration ID
registrationSchema.pre('save', async function (next) {
  if (!this.registrationId) {
    try {
      const count = await mongoose.model('Registration').countDocuments();
      this.registrationId = `IGN-2026-${String(count + 1).padStart(5, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Compound Indexes for Performance
registrationSchema.index({ visibleToUsers: 1, createdAt: -1 });
registrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);

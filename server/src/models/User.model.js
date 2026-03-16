const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  collegeType: { type: String, enum: ['IILM', 'Other'], default: 'Other' },

  // IILM students
  year: { type: String },
  course: { type: String },
  rollNumber: { type: String },
  officialEmail: { type: String },

  // Other college
  collegeName: { type: String },
  studentIdCard: { type: String }, // Firebase Storage URL

  role: { type: String, enum: ['participant', 'admin'], default: 'participant' },
  clerkId: { type: String, unique: true, sparse: true },
  githubId: { type: String },
  githubUsername: { type: String },
  fcmToken: { type: String },
  isProfileComplete: { type: Boolean, default: false },
  teamRegistrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Registration' }],
}, { timestamps: true });

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);

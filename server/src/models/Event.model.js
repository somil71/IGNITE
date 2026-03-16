const mongoose = require('mongoose');

const coordinatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, default: 'TBA' },
}, { _id: false });

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: {
    type: String,
    enum: ['Technical', 'Creative & Innovation', 'Fun'],
    required: true,
  },
  description: { type: String, required: true },
  rules: [{ type: String }],
  eligibility: { type: String, default: 'UG/PG students' },
  teamSize: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 1 },
    label: { type: String },
  },
  registrationFee: { type: Number, default: 0 },
  feeType: {
    type: String,
    enum: ['per_person', 'per_team'],
    default: 'per_person'
  },
  maxParticipants: { type: Number, default: null }, // null = unlimited
  registrationDeadline: { type: Date, default: null },
  prize: {
    first: { type: String },
    second: { type: String },
    third: { type: String },
    description: { type: String },
  },
  facultyCoordinators: [coordinatorSchema],
  studentCoordinators: [coordinatorSchema],
  whatsappGroupLink: { type: String, default: '' },
  bannerImage: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  registrationCount: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
}, { timestamps: true });

eventSchema.index({ slug: 1 });
eventSchema.index({ category: 1 });

module.exports = mongoose.model('Event', eventSchema);

const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  position: { type: Number, enum: [1, 2, 3], required: true },
  teamName: { type: String, required: true },
  members: [{ type: String }],
  prize: { type: String },
  college: { type: String },
  certificateUrl: { type: String },
  photo: { type: String },
}, { timestamps: true });

winnerSchema.index({ eventId: 1, position: 1 }, { unique: true });

module.exports = mongoose.model('Winner', winnerSchema);

const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  teamName: { type: String, required: true, trim: true },
  members: [{ type: String }],
  score: { type: Number, default: 0 },
  rank: { type: Number },
  college: { type: String },
  notes: { type: String },
}, { timestamps: true });

leaderboardSchema.index({ eventId: 1, rank: 1 });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);

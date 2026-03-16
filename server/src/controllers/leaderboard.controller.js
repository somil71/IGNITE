const Leaderboard = require('../models/Leaderboard.model');
const Event = require('../models/Event.model');

exports.getLeaderboard = async (req, res, next) => {
  try {
    const events = await Event.find({ isActive: true }, 'title slug category');
    const result = await Promise.all(
      events.map(async (event) => {
        const entries = await Leaderboard.find({ eventId: event._id })
          .sort({ rank: 1, score: -1 })
          .limit(10);
        return { event, entries };
      })
    );
    res.json({ leaderboard: result });
  } catch (err) {
    next(err);
  }
};

exports.getEventLeaderboard = async (req, res, next) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const entries = await Leaderboard.find({ eventId: event._id })
      .sort({ rank: 1, score: -1 });

    res.json({ event, entries });
  } catch (err) {
    next(err);
  }
};

exports.upsertEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entry = id
      ? await Leaderboard.findByIdAndUpdate(id, req.body, { new: true })
      : await Leaderboard.create(req.body);
    res.json({ entry });
  } catch (err) {
    next(err);
  }
};

exports.deleteEntry = async (req, res, next) => {
  try {
    await Leaderboard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    next(err);
  }
};

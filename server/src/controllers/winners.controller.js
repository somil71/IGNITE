const Winner = require('../models/Winner.model');
const Event = require('../models/Event.model');

exports.getAllWinners = async (req, res, next) => {
  try {
    const events = await Event.find({ isActive: true }, 'title slug category');
    const result = await Promise.all(
      events.map(async (event) => {
        const winners = await Winner.find({ eventId: event._id }).sort({ position: 1 });
        return { event, winners };
      })
    );
    res.json({ winners: result.filter(r => r.winners.length > 0) });
  } catch (err) {
    next(err);
  }
};

exports.getEventWinners = async (req, res, next) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const winners = await Winner.find({ eventId: event._id }).sort({ position: 1 });
    res.json({ event, winners });
  } catch (err) {
    next(err);
  }
};

exports.upsertWinner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const winner = id
      ? await Winner.findByIdAndUpdate(id, req.body, { new: true })
      : await Winner.create(req.body);
    res.json({ winner });
  } catch (err) {
    next(err);
  }
};

exports.deleteWinner = async (req, res, next) => {
  try {
    await Winner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Winner deleted' });
  } catch (err) {
    next(err);
  }
};

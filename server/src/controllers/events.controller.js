const Event = require('../models/Event.model');
const { slugify } = require('../utils/slugify');

exports.getAllEvents = async (req, res, next) => {
  try {
    const { category, search, includeInactive } = req.query;
    const filter = {};

    // Public requests only see active events; admin passes includeInactive=true
    if (includeInactive !== 'true') {
      filter.isActive = true;
    }

    if (category && category !== 'All') filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const events = await Event.find(filter)
      .select('-__v')
      .sort({ category: 1, order: 1, title: 1 });

    res.json({ events, count: events.length });
  } catch (err) {
    next(err);
  }
};

exports.getEventBySlug = async (req, res, next) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug, isActive: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ event });
  } catch (err) {
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const slug = req.body.slug || slugify(req.body.title);
    const event = await Event.create({ ...req.body, slug });
    res.status(201).json({ event });
  } catch (err) {
    next(err);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ event });
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Event deactivated' });
  } catch (err) {
    next(err);
  }
};

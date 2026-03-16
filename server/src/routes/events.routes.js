const router = require('express').Router();
const { getAllEvents, getEventBySlug } = require('../controllers/events.controller');

router.get('/', getAllEvents);
router.get('/:slug', getEventBySlug);

module.exports = router;

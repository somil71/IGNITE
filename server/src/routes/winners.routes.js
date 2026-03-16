const router = require('express').Router();
const { getAllWinners, getEventWinners } = require('../controllers/winners.controller');

router.get('/', getAllWinners);
router.get('/:slug', getEventWinners);

module.exports = router;

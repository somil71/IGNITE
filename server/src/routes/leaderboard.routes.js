const router = require('express').Router();
const { getLeaderboard, getEventLeaderboard } = require('../controllers/leaderboard.controller');

router.get('/', getLeaderboard);
router.get('/:slug', getEventLeaderboard);

module.exports = router;

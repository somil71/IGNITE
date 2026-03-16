const router = require('express').Router();
const { createTicket, getUserTickets } = require('../controllers/support.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, createTicket);
router.get('/me', protect, getUserTickets);

module.exports = router;

const router = require('express').Router();
const { createRegistration, getMyRegistrations } = require('../controllers/registration.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, createRegistration);
router.get('/me', protect, getMyRegistrations);

module.exports = router;

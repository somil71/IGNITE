const router = require('express').Router();
const { checkEmail } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/check-email', protect, checkEmail);

module.exports = router;

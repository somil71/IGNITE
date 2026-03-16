const router = require('express').Router();
const { uploadPaymentProof, getMyPayments, reuploadPayment } = require('../controllers/payment.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/upload', protect, uploadPaymentProof);
router.patch('/:id/reupload', protect, reuploadPayment);
router.get('/me', protect, getMyPayments);

module.exports = router;

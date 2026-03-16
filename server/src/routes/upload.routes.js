const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth.middleware');
const { uploadPaymentProof, uploadStudentId } = require('../controllers/upload.controller');

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed. JPG, PNG, and WebP accepted.'), false);
    }
  }
});

const singleUpload = upload.single('file');

// POST /api/upload/payment-proof
router.post('/payment-proof', ...protect, singleUpload, uploadPaymentProof);

// POST /api/upload/student-id
router.post('/student-id', ...protect, singleUpload, uploadStudentId);

module.exports = router;

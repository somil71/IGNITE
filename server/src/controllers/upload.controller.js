const { uploadBuffer } = require('../config/cloudinary');

exports.uploadPaymentProof = async (req, res) => {
  try {
    console.log('[Upload] Starting upload for:', req.file?.originalname);
    if (!req.file) {
      return res.status(400).json({ message: 'No file was provided.' });
    }

    const timestamp = Date.now();
    const filename = `${timestamp}-${req.file.originalname.split('.')[0]}`;
    
    console.log('[Upload] Config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      has_key: !!process.env.CLOUDINARY_API_KEY,
      has_secret: !!process.env.CLOUDINARY_API_SECRET
    });

    console.log('[Upload] Buffering to Cloudinary...');
    const result = await uploadBuffer(
      req.file.buffer,
      'ignite-2026/payment-proofs',
      filename
    );
    console.log('[Upload] Success:', result.secure_url);

    res.status(200).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('[Upload] Error trace:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during upload'
    });
  }
};

exports.uploadStudentId = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file was provided.' });
    }

    const timestamp = Date.now();
    const filename = `${timestamp}-${req.file.originalname.split('.')[0]}`;
    
    const result = await uploadBuffer(
      req.file.buffer,
      'ignite-2026/student-ids',
      filename
    );

    res.status(200).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('[Upload] Student ID error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

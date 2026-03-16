const { uploadBuffer } = require('../config/cloudinary');

exports.uploadPaymentProof = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file was provided.' });
    }

    const timestamp = Date.now();
    const filename = `${timestamp}-${req.file.originalname.split('.')[0]}`;
    
    const result = await uploadBuffer(
      req.file.buffer,
      'ignite-2026/payment-proofs',
      filename
    );

    res.status(200).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('[Upload] Payment proof error:', error);
    res.status(500).json({
      success: false,
      message: error.message
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

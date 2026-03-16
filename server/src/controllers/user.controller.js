const User = require('../models/User.model');

exports.checkEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email query parameter is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('name');
    
    if (user) {
      return res.json({ exists: true, name: user.name });
    }

    res.json({ exists: false });
  } catch (err) {
    next(err);
  }
};

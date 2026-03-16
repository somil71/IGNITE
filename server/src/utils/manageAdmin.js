const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User.model');
const { connectDB } = require('../config/db');

const manageAdmin = async () => {
  const email = process.argv[2];
  const action = process.argv[3] || 'promote'; // 'promote' or 'demote'

  if (!email) {
    console.error('\n❌ Please provide an email address.');
    console.log('Usage: node src/utils/manageAdmin.js <email> [promote|demote]');
    process.exit(1);
  }

  try {
    await connectDB();
    
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.error(`\n❌ User with email "${email}" not found in database.`);
      console.log('Note: The user must have signed in or signed up at least once.');
      process.exit(1);
    }

    if (action === 'promote') {
      user.role = 'admin';
      await user.save();
      console.log(`\n✅ SUCCESS: User "${email}" has been promoted to ADMIN.`);
    } else if (action === 'demote') {
      user.role = 'participant';
      await user.save();
      console.log(`\n✅ SUCCESS: User "${email}" has been demoted to PARTICIPANT.`);
    } else {
      console.error(`\n❌ Invalid action: "${action}". Use "promote" or "demote".`);
    }

    process.exit(0);
  } catch (err) {
    console.error('\n❌ ERROR:', err.message);
    process.exit(1);
  }
};

manageAdmin();

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const eventSchema = new mongoose.Schema({}, { strict: false });
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

async function checkHealth() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    console.log('Connecting to:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const count = await Event.countDocuments();
    console.log('Total events in database:', count);

    if (count === 0) {
      console.log('Database is empty. You might need to run npm run seed.');
    } else {
      const sample = await Event.findOne();
      console.log('Sample event title:', sample?.title);
    }

    await mongoose.disconnect();
    console.log('Disconnected.');
  } catch (err) {
    console.error('Health check failed:', err);
  }
}

checkHealth();

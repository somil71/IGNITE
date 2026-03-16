const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Event = require('./src/models/Event.model');

async function testFetch() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    const event = await Event.findOne({ slug: 'technical-poster-presentation' });
    console.log('Event found:', event?.title);
    console.log('Rules:', event?.rules);

    await mongoose.disconnect();
    console.log('Disconnected.');
  } catch (err) {
    console.error('ERROR FETCHING EVENT:', err);
  }
}

testFetch();

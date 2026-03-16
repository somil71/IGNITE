const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Manually define the schema or require it
const coordinatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, default: '' },
}, { _id: false });

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: {
    type: String,
    enum: ['Technical', 'Creative & Innovation', 'Fun'],
    required: true,
  },
  description: { type: String, required: true },
  rules: [{ type: String }],
  eligibility: { type: String, default: 'UG/PG students' },
  teamSize: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 1 },
    label: { type: String },
  },
  registrationFee: { type: Number, default: 0 },
  maxParticipants: { type: Number, default: null },
  registrationDeadline: { type: Date, default: null },
  prize: {
    first: { type: String },
    second: { type: String },
    third: { type: String },
    description: { type: String },
  },
  facultyCoordinators: [coordinatorSchema],
  studentCoordinators: [coordinatorSchema],
  whatsappGroupLink: { type: String, default: '' },
  bannerImage: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  registrationCount: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

async function testFetch(slug) {
  console.log(`\n--- Testing slug: ${slug} ---`);
  try {
    const start = Date.now();
    const event = await Event.findOne({ slug, isActive: true });
    const end = Date.now();
    console.log(`Time taken: ${end - start}ms`);
    if (!event) {
      console.log('Event not found or inactive');
    } else {
      console.log('Event found:', event.title);
      console.log('Rules count:', event.rules?.length);
    }
  } catch (err) {
    console.error('ERROR FETCHING EVENT:', err);
  }
}

async function run() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ignite2026';
    console.log('Connecting to:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    await testFetch('poshan-lab');
    await testFetch('pixel-quest');
    await testFetch('robo-racing');

    await mongoose.disconnect();
    console.log('Disconnected.');
  } catch (err) {
    console.error('SETUP ERROR:', err);
  }
}

run();

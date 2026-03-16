const mongoose = require('mongoose');

async function makeAdmin() {
  await mongoose.connect('mongodb://localhost:27017/ignite2026');
  
  const result = await mongoose.connection.db.collection('users').updateOne(
    { email: 'somiljha52@gmail.com' },
    { $set: { role: 'admin' } }
  );
  
  console.log('Matched:', result.matchedCount, '| Modified:', result.modifiedCount);
  
  if (result.matchedCount === 0) {
    console.log('No user found with that email. Listing all users:');
    const users = await mongoose.connection.db.collection('users').find({}, { projection: { email: 1, role: 1, name: 1 } }).toArray();
    users.forEach(u => console.log(`  ${u.email} — role: ${u.role} — name: ${u.name}`));
  }
  
  await mongoose.disconnect();
}

makeAdmin().catch(err => { console.error(err); process.exit(1); });

require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n🔥 IGNITE Server running on port ${PORT}`);
    console.log(`   ENV: ${process.env.NODE_ENV}`);
    console.log(`   MongoDB: Connected`);
  });
};

start().catch((err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});

module.exports = app;

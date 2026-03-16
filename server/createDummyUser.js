require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const { clerkClient } = require('@clerk/clerk-sdk-node');

async function createDummyUser() {
  try {
    console.log('Using Clerk Secret Key:', process.env.CLERK_SECRET_KEY ? 'Present' : 'Missing');
    
    const user = await clerkClient.users.createUser({
      emailAddress: ['ignite.test.dummy' + Date.now() + '@example.com'],
      username: 'ignite_tester_' + Math.floor(Math.random() * 10000),
      phoneNumber: ['+15555550100'],
      password: 'IgniteFest@2026!Secure#Pass',
      firstName: 'Ignite',
      lastName: 'Tester',
      skipPasswordChecks: true,
      skipPasswordRequirement: false
    });

    console.log('✅ Dummy user created successfully!');
    console.log('User ID:', user.id);
    console.log('Email:', user.emailAddresses[0].emailAddress);
    console.log('Username:', user.username);
  } catch (error) {
    console.error('❌ Error creating dummy user:');
    if (error.errors) {
       error.errors.forEach((e, i) => {
         console.error(`Error ${i+1}:`);
         console.error(`  Message: ${e.longMessage || e.message}`);
         console.error(`  Code: ${e.code}`);
         if (e.meta) console.error(`  Field: ${e.meta.paramName}`);
       });
    } else {
       console.error(error.message);
    }
  }
}

createDummyUser();

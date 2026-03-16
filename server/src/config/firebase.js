const admin = require('firebase-admin');

let firebaseApp = null;

const initFirebase = () => {
  if (firebaseApp) return firebaseApp;

  try {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
    console.log('   Firebase Admin: Connected');
  } catch (err) {
    console.warn('   Firebase Admin: Not configured (optional features disabled)');
  }

  return firebaseApp;
};

const getFirestore = () => {
  initFirebase();
  return admin.firestore();
};

const getMessaging = () => {
  initFirebase();
  return admin.messaging();
};

module.exports = { initFirebase, getFirestore, getMessaging };

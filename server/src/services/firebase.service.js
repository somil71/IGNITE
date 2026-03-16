const { getMessaging, getFirestore } = require('../config/firebase');

exports.sendPushNotification = async (fcmToken, title, body, data = {}) => {
  try {
    const messaging = getMessaging();
    await messaging.send({
      token: fcmToken,
      notification: { title, body },
      data,
      android: { priority: 'high' },
      webpush: { headers: { Urgency: 'high' } },
    });
  } catch (err) {
    console.error('FCM send error:', err.message);
  }
};

exports.broadcastNotification = async (title, body, data = {}) => {
  try {
    const messaging = getMessaging();
    await messaging.send({
      topic: 'ignite-2026-all',
      notification: { title, body },
      data,
    });
  } catch (err) {
    console.error('FCM broadcast error:', err.message);
  }
};

exports.createSupportTicket = async (userId, userEmail, message) => {
  const db = getFirestore();
  const ref = db.collection('supportRequests').doc();
  await ref.set({
    id: ref.id,
    userId,
    userEmail,
    message,
    status: 'open',
    adminReply: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return ref.id;
};

exports.replyToSupportTicket = async (ticketId, adminReply) => {
  const db = getFirestore();
  await db.collection('supportRequests').doc(ticketId).update({
    adminReply,
    status: 'replied',
    updatedAt: new Date(),
  });
};

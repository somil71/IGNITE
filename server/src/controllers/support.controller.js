const { createSupportTicket, replyToSupportTicket, getFirestore } = require('../config/firebase');

exports.createTicket = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message?.trim())
      return res.status(400).json({ message: 'Message is required' });

    const ticketId = await createSupportTicket(
      req.user._id.toString(),
      req.user.email,
      message.trim()
    );

    res.status(201).json({ message: 'Support ticket created', ticketId });
  } catch (err) {
    next(err);
  }
};

exports.getUserTickets = async (req, res, next) => {
  try {
    const db = getFirestore();
    const snapshot = await db.collection('supportRequests')
      .where('userId', '==', req.user._id.toString())
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ tickets });
  } catch (err) {
    next(err);
  }
};

exports.getAllTickets = async (req, res, next) => {
  try {
    const db = getFirestore();
    const snapshot = await db.collection('supportRequests')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get();

    const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ tickets });
  } catch (err) {
    next(err);
  }
};

exports.replyToTicket = async (req, res, next) => {
  try {
    const { reply } = req.body;
    await replyToSupportTicket(req.params.ticketId, reply);
    res.json({ message: 'Reply sent' });
  } catch (err) {
    next(err);
  }
};

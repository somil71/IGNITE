const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');
const eventsCtrl = require('../controllers/events.controller');
const registrationCtrl = require('../controllers/registration.controller');
const paymentCtrl = require('../controllers/payment.controller');
const leaderboardCtrl = require('../controllers/leaderboard.controller');
const winnersCtrl = require('../controllers/winners.controller');
const supportCtrl = require('../controllers/support.controller');
const adminCtrl = require('../controllers/admin.controller');

router.use(protect, adminOnly);

// Stats
router.get('/stats', adminCtrl.getDashboardStats);
router.get('/users', adminCtrl.getAllUsers);
router.post('/notify', adminCtrl.broadcastNotification);

// Events CRUD
router.post('/events', eventsCtrl.createEvent);
router.put('/events/:id', eventsCtrl.updateEvent);
router.delete('/events/:id', eventsCtrl.deleteEvent);

// Registrations
router.get('/registrations/export', registrationCtrl.exportRegistrationsCsv);
router.get('/registrations', registrationCtrl.getAllRegistrations);
router.put('/registrations/:id', registrationCtrl.updateRegistrationStatus);

// Payments
router.get('/payments', paymentCtrl.getAllPayments);
router.put('/payments/:id', paymentCtrl.verifyPayment);
router.patch('/payments/:id/override', paymentCtrl.overridePayment);

// Leaderboard
router.post('/leaderboard', leaderboardCtrl.upsertEntry);
router.put('/leaderboard/:id', leaderboardCtrl.upsertEntry);
router.delete('/leaderboard/:id', leaderboardCtrl.deleteEntry);

// Winners
router.post('/winners', winnersCtrl.upsertWinner);
router.put('/winners/:id', winnersCtrl.upsertWinner);
router.delete('/winners/:id', winnersCtrl.deleteWinner);

// Support
router.get('/support', supportCtrl.getAllTickets);
router.post('/support/:ticketId/reply', supportCtrl.replyToTicket);

module.exports = router;

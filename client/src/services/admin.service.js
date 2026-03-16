import api from './api';

export const adminService = {
  // Stats
  getStats: () => api.get('/admin/stats'),
  
  // Events
  getAllEvents: () => api.get('/events', { params: { includeInactive: 'true' } }),
  createEvent: (data) => api.post('/admin/events', data),
  updateEvent: (id, data) => api.put(`/admin/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/admin/events/${id}`),
  
  // Registrations
  getRegistrations: (params) => api.get('/admin/registrations', { params }),
  updateRegistrationStatus: (id, status) => api.put(`/admin/registrations/${id}`, { status }),
  
  // Payments
  getPayments: (params) => api.get('/admin/payments', { params }),
  verifyPayment: (id, status, note) => api.put(`/admin/payments/${id}`, { paymentStatus: status, note }),
  overridePayment: (id, note) => api.patch(`/admin/payments/${id}/override`, { note }),
  
  // Leaderboard
  getLeaderboard: (slug) => api.get(`/leaderboard/${slug}`),
  upsertLeaderboard: (data) => api.post('/admin/leaderboard', data),
  deleteLeaderboard: (id) => api.delete(`/admin/leaderboard/${id}`),
  
  // Winners
  getWinners: (slug) => api.get(`/winners/${slug}`),
  upsertWinner: (data) => api.post('/admin/winners', data),
  deleteWinner: (id) => api.delete(`/admin/winners/${id}`),
  
  // Notifications
  broadcast: (data) => api.post('/admin/notify', data)
};

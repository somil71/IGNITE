import api from './api';

export const eventsService = {
  getAll: (params) => api.get('/events', { params }),
  getBySlug: (slug) => api.get(`/events/${slug}`),
};

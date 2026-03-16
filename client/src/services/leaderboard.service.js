import api from './api';

export const leaderboardService = {
  getAll: () => api.get('/leaderboard'),
  getByEvent: (slug) => api.get(`/leaderboard/${slug}`),
  update: (id, data) => api.put(`/admin/leaderboard/${id}`, data),
};

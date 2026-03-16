import api from './api';

export const winnersService = {
  getAll: () => api.get('/winners'),
  getByEvent: (slug) => api.get(`/winners/${slug}`),
  update: (id, data) => api.put(`/admin/winners/${id}`, data),
};

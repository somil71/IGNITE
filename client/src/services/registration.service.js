import api from './api';

export const registrationService = {
  create: (data) => api.post('/registrations', data),
  getMine: () => api.get('/registrations/me'),
};

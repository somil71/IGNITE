import api from './api';

export const paymentService = {
  uploadProof: (data) => api.post('/payments/upload', data),
  reuploadProof: (id, data) => api.patch(`/payments/${id}/reupload`, data),
  getMyPayments: () => api.get('/payments/me'),
};

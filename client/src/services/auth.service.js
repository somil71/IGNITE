import api from './api';

export const authService = {
  sendOTP: (email) => api.post('/auth/send-otp', { email }),
  verifyOTP: (email, otp) => api.post('/auth/verify-otp', { email, otp }),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  registerFCMToken: (fcmToken) => api.post('/auth/fcm-token', { fcmToken }),
};

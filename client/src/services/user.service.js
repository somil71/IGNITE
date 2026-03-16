import api from './api';

export const userService = {
  checkEmail: (email) => api.get(`/users/check-email?email=${email}`),
};

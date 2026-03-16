import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Clerk session token to every request
api.interceptors.request.use(
  async (config) => {
    try {
      // window.Clerk is set by ClerkProvider after initialization
      // session is null if user is not signed in
      if (window.Clerk && window.Clerk.session) {
        const token = await window.Clerk.session.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      // Clerk not ready or user not signed in
      // Request proceeds without auth header
      // Protected routes will return 401
      console.warn('[API] Token fetch skipped:', err.message);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 — try once with a fresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // skipCache forces Clerk to get a fresh token
        // instead of returning the cached (possibly expired) one
        const token = await window.Clerk?.session?.getToken({
          skipCache: true,
        });
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        }
      } catch (retryErr) {
        console.warn('[API] Token refresh failed:', retryErr.message);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

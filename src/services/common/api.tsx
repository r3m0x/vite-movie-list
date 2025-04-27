import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  responseType: "json",
  withCredentials: false,
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
            console.error('Unauthorized');
          break;
        case 403:
          // Forbidden - show error message
          console.error('Access denied');
          break;
        case 404:
          // Not found - show error message
          console.error('Resource not found');
          break;
        default:
          // Other errors - show generic error message
          console.error('An error occurred:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
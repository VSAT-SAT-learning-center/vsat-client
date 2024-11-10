import axios from 'axios';
import apiConfig from '~/configs/apiConfig';

const apiClient = axios.create({
  baseURL: apiConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the access token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle token expiration and authorization errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized: clear access token and optionally redirect to login
        console.error('Unauthorized: Please log in again.');
        localStorage.removeItem('accessToken');
        // Optionally trigger logout logic or redirect to login
      } else if (error.response.status === 403) {
        console.error('Access forbidden: You do not have permission');
      } else {
        console.error(`Error: ${error.response.statusText}`);
      }
    } else if (error.request) {
      // Handle errors where no response was received
      console.error('No response received from server.');
    } else {
      // Something happened in setting up the request
      console.error('Error in setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

import axios from 'axios';
import apiConfig from '~/configs/apiConfig';
const apiClient = axios.create({
  baseURL: apiConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  // You can add any custom request configuration here
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers['Authorization'] = `Bearer ${token}`;
  // }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to handle responses and errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error responses like unauthorized (401) or forbidden (403)
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized: Please log in again.');
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

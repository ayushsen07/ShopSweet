import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'https://shopsweet.onrender.com/api', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
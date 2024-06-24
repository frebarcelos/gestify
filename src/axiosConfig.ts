
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fre123di-001-site1.atempurl.com/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

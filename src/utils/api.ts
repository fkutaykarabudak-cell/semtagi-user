import axios from 'axios';

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const isMissingApiIndex = rawBaseUrl.endsWith('/api') ? false : true;

const api = axios.create({
  baseURL: isMissingApiIndex ? `${rawBaseUrl}/api` : rawBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('user-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

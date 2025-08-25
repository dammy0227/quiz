// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://quiz-qzil.onrender.com/api', // <-- updated to live backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const companyAPI = {
  create: (data) => api.post('/companies', data),
  getAll: (params) => api.get('/companies', { params }),
  getById: (id) => api.get(`/companies/${id}`),
  update: (id, data) => api.put(`/companies/${id}`, data),
  delete: (id) => api.delete(`/companies/${id}`),
};

export const reviewAPI = {
  create: (data) => api.post('/reviews', data),
  getByCompany: (companyId, params) => api.get(`/reviews/company/${companyId}`, { params }),
  getById: (id) => api.get(`/reviews/${id}`),
  like: (id) => api.put(`/reviews/${id}/like`),
  delete: (id) => api.delete(`/reviews/${id}`),
};

export default api;
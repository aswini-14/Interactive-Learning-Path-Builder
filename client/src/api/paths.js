import api from './axiosInstance';

export const getPaths   = () => api.get('/paths');
export const createPath = data => api.post('/paths', data);
export const getPath    = id   => api.get(`/paths/${id}`);

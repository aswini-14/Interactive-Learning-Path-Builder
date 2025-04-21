import api from './axiosInstance';

export const updateProgress = resource_id => api.post('/progress', { resource_id });

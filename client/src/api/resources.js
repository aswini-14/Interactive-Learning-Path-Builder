import api from './axiosInstance';

export const addResource  = data => api.post('/resources', data);
export const getResources = path_id => api.get(`/resources/${path_id}`);

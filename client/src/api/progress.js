import api from './axiosInstance';

export const updateProgress = resource_id => api.post('/progress', { resource_id });
export const getCompletedResources = (pathId) => {
    return api.get(`/progress/completed/${pathId}`);
  };
import api from './axiosInstance';

export const getProgress = async (pathId) => {
  try {
    const response = await api.get(`/progress/progress/${pathId}`);
    return response.data
  } catch (error) {
    console.error('Error fetching progress:', error);
    throw error;
  }
};
export const markProgress = async (resourceId) => {
    try {
      const response = await api.post('/progress', { resource_id: resourceId });
      return response.data;
    } catch (error) {
      console.error('Error marking progress:', error);
      throw error;
    }
  };
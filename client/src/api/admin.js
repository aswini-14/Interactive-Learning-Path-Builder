import api from './axiosInstance';
const API_URL = '/admin'; // Base URL for admin-related API endpoints

export const getUsers = async () => {
  return api.get(`${API_URL}/users`);
};

export const updateUserRole = async (userId, role) => {
  return api.put(`${API_URL}/users/${userId}/role`, { role });
};

export const deleteUser = async (userId) => {
  return api.delete(`${API_URL}/users/${userId}`);
};

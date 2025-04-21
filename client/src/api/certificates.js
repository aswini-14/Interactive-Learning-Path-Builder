import api from './axiosInstance';

export const downloadCertificate = pathId =>
  api.get(`/certificates/${pathId}`, { responseType: 'blob' });

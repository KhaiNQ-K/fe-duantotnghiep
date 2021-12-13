import axiosInstance from './axiosInstance';

export const BASE_URL = '/files/upload';

const fileApi = {
  upload(data) {
    return axiosInstance.post(BASE_URL, data);
  },
};

export default fileApi;

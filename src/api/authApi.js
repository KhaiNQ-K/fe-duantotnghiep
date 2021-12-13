import axiosInstance from './axiosInstance';

const authApi = {
  login(data) {
    const url = '/user/auth';
    return axiosInstance.post(url, data);
  },
};

export default authApi;

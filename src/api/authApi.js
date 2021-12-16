import axiosInstance from './axiosInstance';

const authApi = {
  login(data) {
    const url = '/user/auth';
    console.log('auth api data', data);
    return axiosInstance.post(url, data);
  },
  getUserLogin() {
    const url = '/user/auth';
    return axiosInstance.get(url);
  },
};

export default authApi;

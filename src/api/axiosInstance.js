import axios from 'axios';
// const baseURL = 'http://pure-stream-96271.herokuapp.com/api/v1';
const baseURL = 'http://localhost:8080/api/v1';
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Content-Type': 'Application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers = {
        Authorization: 'Bearer ' + accessToken,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

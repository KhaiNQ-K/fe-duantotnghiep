import axiosInstance from './axiosInstance';

export const BASE_URL = '/customers';

const customerApi = {
  getAll() {
    return axiosInstance.get(BASE_URL);
  },

  getById(id) {
    const url = `${BASE_URL}/${id}`;
    return axiosInstance.get(url);
  },

  create(data) {
    return axiosInstance.get(BASE_URL, data);
  },

  update(id, data) {
    const url = `${BASE_URL}/${id}`;
    return axiosInstance.put(url, data);
  },

  delete(id) {
    const url = `${BASE_URL}/${id}`;
    return axiosInstance.delete(url);
  },
};

export default customerApi;

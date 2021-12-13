import axiosInstance from './axiosInstance';

export const BASE_URL = '/comment';

const commentApi = {
  getAll() {
    return axiosInstance.get(BASE_URL);
  },

  update(id, data) {
    const url = `${BASE_URL}/${id}`;
    return axiosInstance.put(url, data);
  },
};

export default commentApi;

import axiosInstance from './axiosInstance';

export const BASE_URL = '/dentists';

const dentistApi = {
  getAll(params) {
    const url = '/dentists';
    return axiosInstance.get(url, { params });
  },

  getById(id) {
    const url = `/dentists/${id}`;
    return axiosInstance.get(url);
  },
  update(data) {
    console.log(data.id);
    const url = `${BASE_URL}/${data.id}`;
    return axiosInstance.put(url, data);
  },
};

export default dentistApi;

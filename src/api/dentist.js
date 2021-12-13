import axiosInstance from './axiosInstance';

export const dentistapi = {
  update(data) {
    const url = `/dentist/${data.id}`;
    return axiosInstance.put(url, data);
  },
};

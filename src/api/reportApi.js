import axiosInstance from './axiosInstance';

const reportApi = {
  reportCustomer() {
    const url = '/report/dentist';
    return axiosInstance.get(url);
  },
  reportService() {
    const url = '/report/services';
    return axiosInstance.get(url);
  },
  reportDentist() {
    const url = '/report/customer';
    return axiosInstance.get(url);
  },
  reportBooking() {
    const url = '/report/booking';
    return axiosInstance.get(url);
  },
  reportDoanhThu() {
    const url = '/report/doanhthu';
    return axiosInstance.get(url);
  },
  reportDoanhThuNam(year) {
    const url = `/report/doanhthu/${year}`;
    return axiosInstance.get(url);
  },
};
export default reportApi;

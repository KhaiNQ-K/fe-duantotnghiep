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
  reportDaKham() {
    const url = 'report/dakham';
    return axiosInstance.get(url);
  },
  reportDaDatLich() {
    const url = 'report/dadatlich';
    return axiosInstance.get(url);
  },
  reportTopBS() {
    const url = 'report/topbacsi';
    return axiosInstance.get(url);
  },
};
export default reportApi;

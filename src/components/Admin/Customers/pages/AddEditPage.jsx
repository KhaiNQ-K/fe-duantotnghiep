import { ChevronLeft } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import customerApi from 'api/customerApi';
import dentistApi from 'api/dentistApi';
import VoucherForm from 'components/Admin/Voucher/VoucherForm';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import toastifyAlert from 'utils/toastify';
import CustomerForm from '../components/CustomerForm';

function AddEditPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { customerId } = useParams();
  const isEdit = Boolean(customerId);
  const [customer, setCustomer] = useState();
  useEffect(() => {
    if (!customerId) return;
    // IFFE
    (async () => {
      try {
        const response = await customerApi.getById(customerId);
        setCustomer(response.data);
      } catch (error) {
        console.log('Failed to fetch customer details', error);
      }
    })();
  }, [customerId]);
  const initialValues = {
    id: '',
    accounts: '',
    image: '',
    fullName: '',
    birthday: '',
    gender: '',
    communes: '',
    telephone: '',
    story: '',
    createAt: '',
    diachi: '',
    updateAt: new Date(),
    deleteAt: 0,
    ...customer,
  };
  const handleCustomerFormSubmit = async (data) => {
    if (isEdit) {
      try {
        const res = await customerApi.update(data.id, data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    toastifyAlert.success('Sửa thông tin người dùng thành công!');

    // // Redirect back to dentist list
    history.push('/admin/customer');
  };
  return (
    <Box>
      <Link to="/admin/customer">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Trở về trang danh sách người dùng
        </Typography>
      </Link>
      <Typography variant="h4">
        {isEdit ? 'Sửa thông tin người dùng' : 'Add new customer'}
      </Typography>
      {(!isEdit || Boolean(customer)) && (
        <Box mt={3}>
            <CustomerForm initialValues={initialValues} onSubmit={handleCustomerFormSubmit} />
        </Box>
      )}
    </Box>
  );
}

AddEditPage.propTypes = {};

export default AddEditPage;

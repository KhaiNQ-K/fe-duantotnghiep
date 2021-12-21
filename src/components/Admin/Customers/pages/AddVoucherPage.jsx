import { ChevronLeft } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import customerApi from 'api/customerApi';
import voucherApi from 'api/voucherApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import toastifyAlert from 'utils/toastify';
import VoucherForm from '../components/VoucherForm';

function AddVoucherPage(props) {
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
  const voucherList = [
    { value: 0, label: '0%' },
    { value: 5, label: '5%' },
    { value: 10, label: '10%' },
    { value: 15, label: '15%' },
    { value: 20, label: '20%' },
    { value: 25, label: '25%' },
    { value: 30, label: '30%' },
    { value: 35, label: '35%' },
    { value: 40, label: '40%' },
    { value: 45, label: '45%' },
    { value: 50, label: '50%' },
  ];
  const handleCustomerFormSubmit = async (customer) => {
    const data = {
      customerId: customer.id,
      voucher: customer.voucher,
    };
    if (isEdit) {
      try {
        const res = await voucherApi.sale(data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    toastifyAlert.success('Tặng voucher thành công!');

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
        {isEdit ? 'Tặng voucher người dùng' : 'Add new customer'}
      </Typography>
      {(!isEdit || Boolean(customer)) && (
        <Box mt={3}>
          <VoucherForm
            initialValues={initialValues}
            onSubmit={handleCustomerFormSubmit}
            voucherList={voucherList}
          />
        </Box>
      )}
    </Box>
  );
}

AddVoucherPage.propTypes = {};

export default AddVoucherPage;

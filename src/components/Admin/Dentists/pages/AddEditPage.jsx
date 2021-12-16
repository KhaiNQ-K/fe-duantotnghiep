import { ChevronLeft } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import dentistApi from 'api/dentistApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import toastifyAlert from 'utils/toastify';
import DentistForm from '../components/DentistForm';

function AddEditPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { dentistId } = useParams();
  const isEdit = Boolean(dentistId);
  const [dentist, setDentist] = useState();
  useEffect(() => {
    if (!dentistId) return;
    // IFFE
    (async () => {
      try {
        const response = await dentistApi.getById(dentistId);
        setDentist(response.data);
      } catch (error) {
        console.log('Failed to fetch dentist details', error);
      }
    })();
  }, [dentistId]);
  const initialValues = {
    id: '',
    accounts: '',
    image: '',
    cccd: '',
    fullName: '',
    birthday: '',
    gender: '',
    communes: '',
    telephone: '',
    exp: '',
    createAt: '',
    diachi: '',
    updateAt: new Date(),
    deleteAt: 0,
    ...dentist,
  };
  const handleStudentFormSubmit = async (data) => {
    if (isEdit) {
      try {
        const res = await dentistApi.update(data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    toastifyAlert.success('Sửa thông tin nha sĩ thành công!');

    // // Redirect back to dentist list
    history.push('/admin/dentist');
  };
  return (
    <Box>
      <Link to="/admin/dentist">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Trở về trang danh sách nha sĩ
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? 'Sửa thông tin nha sĩ' : 'Add new student'}</Typography>

      {(!isEdit || Boolean(dentist)) && (
        <Box mt={3}>
          <DentistForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}

AddEditPage.propTypes = {};

export default AddEditPage;

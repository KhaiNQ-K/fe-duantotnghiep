import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Alert } from '@mui/lab';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import axiosInstance from 'api/axiosInstance';
import fileApi from 'api/fileApi';
import { communesAction, selectCommunesOptions } from 'app/communes/communesSlice';
import { districtAction, selectDistrictOptions } from 'app/districts/districtSlice';
import { selectProvinceOptions } from 'app/provinceSlice';
import { InputField, RadioGroupField } from 'commons/FormFields';
import { DateField } from 'commons/FormFields/DateField';
import { SelectField } from 'commons/FormFields/SelectField';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import * as yup from 'yup';

const schema = yup.object().shape({
  fullname: yup.string().required('Bạn chưa nhập họ và tên bác sĩ'),
  birthday: yup.date().required('Bạn chưa nhập ngày sinh'),
  gender: yup
    .boolean()
    .oneOf([true, false], 'Vui lòng chọn giới tính nam hoặc nữ')
    .required('Bạn chưa chọn giới tính'),
  communes: yup.string().required('Bạn chưa chọn địa chỉ'),
  telephone: yup
    .string()
    .matches(/^[0-9\-\+]{9,15}$/i, {
      message: 'Số điện thoại không đúng định dạng',
      excludeEmptySring: true,
    })
    .min(9, 'SĐT không được ít hơn 9 số')
    .max(11, 'SĐT không được vượt quá 11 số')
    .required('Bạn chưa nhập SĐT'),
  story: yup.string().required('Bạn chưa nhập tieu su'),
  diachi: yup.string().required('Bạn chưa nhập số nhà'),
});

function CustomerForm({ initialValues, onSubmit }) {
  let initialValue = {
    ...initialValues,
    communes: initialValues.communes.id,
  };
  const dispatch = useDispatch();
  const [provinceId, setProvinceId] = useState(initialValues.communes.districts.provinces.id);
  const [districtId, setDistrictId] = useState(initialValues.communes.districts.id);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState();
  const [{ alt, src }, setImg] = useState({
    src: null,
    alt: 'Upload an Image',
  });

  useEffect(() => {
    dispatch(districtAction.fetchDistrictList(provinceId));
  }, [provinceId]);
  useEffect(() => {
    dispatch(communesAction.fetchCommunesList(districtId));
  }, [districtId]);
  const provinceOptions = useSelector(selectProvinceOptions);
  const districtOptions = useSelector(selectDistrictOptions);
  const communesOptions = useSelector(selectCommunesOptions);
  const [error, setError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const handleChangeProvince = (e) => {
    setProvinceId(e.target.value);
  };
  const handleChangeDistrict = (e) => {
    setDistrictId(e.target.value);
    initialValue.communes = '';
  };
  const handleFormSubmit = async (formState) => {
    const newFormState = { ...formState, communes: { id: formState.communes } };
    console.log(newFormState);
    try {
      // Clear previous submission error
      setError('');
      const imageUpload = new FormData();
      imageUpload.append('image', selectedFile);

      if (selectedFile != null) {
        const res = await fileApi.upload(imageUpload);
        newFormState.image = res;
        await onSubmit?.(newFormState);
      } else {
        await onSubmit?.(newFormState);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const onChangeImage = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
    if (event.target.files && event.target.files[0]) {
      let image = event.target.files[0];
      setSelectedFile(image);
      setImg({
        src: URL.createObjectURL(image),
        alt: image.name,
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Col>
            <InputField label="Họ và tên" control={control} name="fullname" />
            <InputField label="Số điện thoại" control={control} name="telephone" />
            <DateField name="birthday" label="Ngày sinh" control={control} />
            <FormControl>
              <label>Ảnh</label>
              <br />
              <input
                style={{ border: '1px solid #CCCCCC', background: '#EEEEEE', width: '100%' }}
                type="file"
                name="file"
                id="input"
                accept="image/*"
                onChange={(e) => onChangeImage(e)}
              />
              <img
                src={
                  selectedImage != null
                    ? URL.createObjectURL(selectedImage)
                    : `${process.env.REACT_APP_API}/files/download/image?filename=${initialValues.image}`
                }
                style={{
                  border: '1px solid #dddddd',
                  minWidth: '100%',
                  width: '100%',
                  height: '250px',
                  marginTop: '0.5rem',
                  borderRadius: '10px',
                }}
              />
            </FormControl>
          </Col>
          <Col>
            <FormControl fullWidth variant="outlined" margin="normal" size="small">
              <InputLabel id="province_id">Tỉnh/Thành phố</InputLabel>
              <Select
                onChange={handleChangeProvince}
                label="Tỉnh/Thành phố"
                defaultValue={provinceId}
              >
                {provinceOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal" size="small">
              <InputLabel id="province_id">Quận/huyện</InputLabel>
              <Select
                onChange={handleChangeDistrict}
                label="Tỉnh/Thành phố"
                defaultValue={districtId}
              >
                {districtOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {Array.isArray(communesOptions) && communesOptions.length > 0 && (
              <SelectField
                name="communes"
                control={control}
                label="Phường/xã"
                options={communesOptions}
              />
            )}
            <InputField label="Số nhà" control={control} name="diachi" />
            <RadioGroupField
              name="gender"
              control={control}
              label="Giới tính"
              options={[
                { label: 'Male', value: true },
                { label: 'Female', value: false },
              ]}
            />
            <InputField name="story" control={control} label="Tiểu sử" multiline />
          </Col>
          {error && <Alert severity="error">{error}</Alert>}
        </Row>

        <Box mt={3} textAlign="center" mb={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginRight: '3px' }}
            disabled={isSubmitting}
          >
            <SaveIcon />
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Sửa
          </Button>
        </Box>
      </form>
    </Box>
  );
}

CustomerForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default CustomerForm;

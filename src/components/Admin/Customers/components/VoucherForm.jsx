import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Box, Button, CircularProgress, FormControl } from '@mui/material';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { InputField } from 'commons/FormFields/InputField';
import { DateField } from 'commons/FormFields/DateField';
import { SelectField } from 'commons/FormFields/SelectField';
import { RadioGroupField } from 'commons/FormFields/RadioGroupField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from 'react-redux';
import { selectCommunesOptions } from 'app/communes/communesSlice';
function VoucherForm({ onSubmit, initialValues, voucherList }) {
  const [error, setError] = useState('');
  const communesOptions = useSelector(selectCommunesOptions);
  let initialValue = {
    ...initialValues,
    communes: initialValues.communes.id,
    voucher: 0,
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValue,
  });
  const handleFormSubmit = async (value) => {
    await onSubmit?.(value);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Col>
            <InputField label="Họ và tên" control={control} name="id" disabled hidden />
            <InputField label="Họ và tên" control={control} name="fullname" disabled />
            <InputField label="Số điện thoại" control={control} name="telephone" disabled />
            <DateField name="birthday" label="Ngày sinh" control={control} disabled />
            <FormControl>
              <label>Ảnh</label>
              <br />
              <img
                src={`http://localhost:8080/api/v1/files/download/image?filename=${initialValues.image}`}
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
            {Array.isArray(communesOptions) && communesOptions.length > 0 && (
              <SelectField
                name="communes"
                control={control}
                label="Phường/xã"
                options={communesOptions}
                disabled
              />
            )}
            {Array.isArray(voucherList) && voucherList.length > 0 && (
              <SelectField name="voucher" control={control} label="Voucher" options={voucherList} />
            )}

            <InputField label="Số nhà" control={control} name="diachi" disabled />
            <RadioGroupField
              name="gender"
              control={control}
              label="Giới tính"
              options={[
                { label: 'Male', value: true },
                { label: 'Female', value: false },
              ]}
              disabled
            />
          </Col>
          {error && <Alert severity="error">{error}</Alert>}
        </Row>

        <Box mt={3} textAlign="center" mb={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            style={{ marginRight: '3px' }}
          >
            <SaveIcon />
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Gửi voucher
          </Button>
          <Button type="button" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            <CloseIcon />
            Huỷ
          </Button>
        </Box>
      </form>
    </Box>
  );
}

VoucherForm.propTypes = {};

export default VoucherForm;

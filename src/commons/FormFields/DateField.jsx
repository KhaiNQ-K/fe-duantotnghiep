import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useController } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';

export function DateField({ label, name, control, disabled }) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      size="small"
      disabled={disabled}
      error={invalid}
    >
      <label>Ngày sinh</label>
      <Inputs
        placeholder="Home Address"
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}

DateField.propTypes = {};

const Inputs = styled.input`
  width: 100%;
  border-radius: 20px;
  border: 1px solid #dddddd;
  height: 38px;
  font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  color: #2c2c2c;
  font-size: 0.8571em;
  padding: 10px 18px 10px 18px;
`;

import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, TextField } from '@mui/material';
import { useController } from 'react-hook-form';

export function PasswordField({ control, name, label, ...inputProps }) {
  const {
    field: { value, onBlur, onChange, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <TextField
      fullWidth
      size="small"
      error={invalid}
      margin="normal"
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={'password'}
      inputRef={ref}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}

PasswordField.propTypes = {};

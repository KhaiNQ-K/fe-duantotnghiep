import React from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import { TextField } from '@mui/material';

export function InputField({ name, control, label, multiline, ...inputProps }) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      multiline={multiline}
      rows={4}
      inputRef={ref}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}

InputField.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  label: PropTypes.string,
};

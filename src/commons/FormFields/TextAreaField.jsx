import React from 'react';
import PropTypes from 'prop-types';

export function TextAreaField({ name, control, label, ...inputProps }) {
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
      inputRef={ref}
      helperText={error?.message}
      inputProps={inputProps}
      multiline
      rows={4}
    />
  );
}

TextAreaField.propTypes = {};

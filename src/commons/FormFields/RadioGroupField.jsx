import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useController } from 'react-hook-form';

export function RadioGroupField({ label, name, control, disabled, options }) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <FormControl disabled={disabled} error={invalid} margin="normal" component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={disabled}
          />
        ))}
        <FormHelperText error>{error?.message}</FormHelperText>
      </RadioGroup>
    </FormControl>
  );
}

RadioGroupField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  control: PropTypes.object,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

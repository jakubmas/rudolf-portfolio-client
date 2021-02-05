import Button from '@material-ui/core/Button';
import React from 'react';

export const CustomButton = ({
  label,
  color,
  disabled = false,
  style = {},
}) => {
  return (
    <Button variant="contained" color={color} disabled={disabled} style={style}>
      {label}
    </Button>
  );
};

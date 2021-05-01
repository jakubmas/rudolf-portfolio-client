import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export const CustomDialog = ({ isOpen, title, children }) => {
  return (
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth={'sm'}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

CustomDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

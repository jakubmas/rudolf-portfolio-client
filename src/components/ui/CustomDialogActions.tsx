import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  dialogButtons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    borderRadius: '0.7rem',
    color: 'white'
  }
}));

export const CustomDialogActions = ({ handleClose, isButtonDisabled }) => {
  const classes = useStyles();

  const colors = {
    primary: '#7cc78d',
    error: '#c93131',
    success: '#7cb3c7'
  };

  return (
    <DialogActions className={classes.dialogButtons}>
      <Button
        onClick={handleClose}
        variant="contained"
        style={{ backgroundColor: colors['success'] }}
        className={classes.button}
      >
        CANCEL
      </Button>
      <Button
        type="submit"
        variant="contained"
        style={{ backgroundColor: colors.primary }}
        disabled={isButtonDisabled}
        className={classes.button}
      >
        ADD
      </Button>
    </DialogActions>
  );
};

CustomDialogActions.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired
};

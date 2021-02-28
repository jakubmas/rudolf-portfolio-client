import Snackbar from '@material-ui/core/Snackbar';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

export const CustomizedSnackbars = ({ isOpen, message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={isOpen}>
        <Alert severity="success">{message}</Alert>
      </Snackbar>
    </div>
  );
};

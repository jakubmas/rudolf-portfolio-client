import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { LayoutCenterItem, LayoutContainer } from '../../containers/Layout';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    maxWidth: '30rem',
    minHeight: '20rem',
    backgroundColor: '#FFFFFF',
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: '1.2rem',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: 'transparent',
      border: 'none',
    },
  },
  inputContainer: {
    padding: '1.2rem',
    width: '20rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  button: {
    marginTop: '1.5rem',
    width: '6rem',
    borderRadius: '0.7rem',
    color: 'white',
  },
}));

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');

  const onChangeEmail = (e) => {
    let valid;

    setEmail(e.target.value);
    valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value);

    if (!valid) {
      setEmailHelper('Invalid email');
    } else {
      setEmailHelper('');
    }
  };

  const onChangePassword = (e) => {
    let valid;
    setPassword(e.target.value);
    valid = e.target.value.trim().length > 4;

    if (!valid && e.target.value.trim().length === 0) {
      setPasswordHelper('Password is required');
    } else if (!valid) {
      setPasswordHelper('Password has to be longer than 4 character');
    } else {
      setPasswordHelper('');
    }
  };

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="sm" columnsNumber={12}>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.form}
        >
          <Grid item className={classes.inputContainer}>
            <Input
              label="email"
              value={email}
              helperText={emailHelper}
              setValue={onChangeEmail}
            />
          </Grid>
          <Grid item className={classes.inputContainer}>
            <Input
              label="password"
              value={password}
              type="password"
              helperText={passwordHelper}
              setValue={onChangePassword}
            />
          </Grid>

          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Login
          </Button>
        </Grid>
      </LayoutCenterItem>
    </LayoutContainer>
  );
}

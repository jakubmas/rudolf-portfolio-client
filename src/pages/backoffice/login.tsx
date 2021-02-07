import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useMutation } from 'urql';
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
      border: 'none'
    }
  },
  inputContainer: {
    padding: '1.2rem',
    width: '20rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  button: {
    marginTop: '1.5rem',
    width: '6rem',
    borderRadius: '0.7rem',
    color: 'white'
  }
}));

const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!){
    login(options: {
      username: $username,
      password: $password
    }){
      errors{
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        username
        password
      }
    }
  }
`;

const login: React.FC = () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameHelper, setUsernameHelper] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');
  const [, login] = useMutation(LOGIN_MUTATION);

  const onChangeusername = (e) => {
    let valid;

    setUsername(e.target.value);
    valid = e.target.value.length > 0;
    // valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value);

    if (!valid) {
      setUsernameHelper('Invalid username');
    } else {
      setUsernameHelper('');
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

  const loginHandler = async (e) => {
    e.preventDefault();
    await login({ username, password });
  };

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="sm" columnsNumber={12}>
        <form onSubmit={loginHandler}>
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
                label="username"
                value={username}
                helperText={usernameHelper}
                setValue={onChangeusername}
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
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Login
            </Button>
          </Grid>
        </form>
      </LayoutCenterItem>
    </LayoutContainer>
  );
};

export default login;

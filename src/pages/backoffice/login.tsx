import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import React from 'react';
import { useMutation } from 'urql';
import * as yup from 'yup';
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

  const [, login] = useMutation(LOGIN_MUTATION);

  const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup
      .string()
      .min(4, 'Password has to be longer than 4 character')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (v) => {
      console.log('v', v);
      console.log('formik', formik);

      await login({ username: v.username, password: v.password });
    }
  });

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="sm" columnsNumber={12}>
        <form onSubmit={formik.handleSubmit}>
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
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                setValue={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item className={classes.inputContainer}>
              <Input
                id="password"
                name="password"
                label="Passowrd"
                type="password"
                value={formik.values.password}
                setValue={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={
                Boolean(formik.errors.password) ||
                Boolean(formik.errors.username)
              }
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

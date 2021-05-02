import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import * as yup from 'yup';
import { Input } from '../../components/ui/Inputs/Input';
import { LayoutCenterItem, LayoutContainer } from '../../containers/Layout';
import { useLoginMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';

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
  },
  forgotPasswordButton: {
    cursor: 'pointer',
    color: theme.palette.text.secondary
  }
}));

const login: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();

  const [, login] = useLoginMutation();

  const validationSchema = yup.object({
    usernameOrEmail: yup.string().required('Username is required'),
    password: yup
      .string()
      .min(4, 'Password has to be longer than 4 character')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      const response = await login(values);

      if (response.data.login.errors) {
        setErrors(toErrorMap(response.data.login.errors));
      } else if (response.data.login.user) {
        router.push('/backoffice/photos');
      }
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
                id="usernameOrEmail"
                name="usernameOrEmail"
                label="Username or Email"
                value={formik.values.usernameOrEmail}
                setValue={formik.handleChange}
                error={
                  formik.touched.usernameOrEmail &&
                  Boolean(formik.errors.usernameOrEmail)
                }
                helperText={
                  formik.touched.usernameOrEmail &&
                  formik.errors.usernameOrEmail
                }
              />
            </Grid>
            <Grid item className={classes.inputContainer}>
              <Input
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                setValue={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid>
              <NextLink href="/backoffice/forgot-password" passHref>
                <Typography
                  component="p"
                  className={classes.forgotPasswordButton}
                >
                  Forgot password?
                </Typography>
              </NextLink>
            </Grid>

            <Grid>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={
                  Boolean(formik.errors.password) ||
                  Boolean(formik.errors.usernameOrEmail)
                }
                className={classes.button}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </LayoutCenterItem>
    </LayoutContainer>
  );
};

export default withUrqlClient(createUrqlClient)(login);

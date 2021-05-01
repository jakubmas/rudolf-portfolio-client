import { Button, Grid } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Input } from '../../../components/ui/Inputs/Input';
import { LayoutCenterItem, LayoutContainer } from '../../../containers/Layout';
import { useChangePasswordMutation } from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { toErrorMap } from '../../../utils/toErrorMap';

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

const ChangePassword: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');

  const validationSchema = yup.object({
    newPassword: yup
      .string()
      .min(4, 'Password has to be longer than 4 character')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      newPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      const response = await changePassword({
        newPassword: values.newPassword,
        token: typeof router.query.token === 'string' ? router.query.token : ''
      });
      if (response.data.changePassword.errors) {
        const errorMap = toErrorMap(response.data.changePassword.errors);
        if ('token' in errorMap) {
          setTokenError(errorMap.token);
        }
        setErrors(errorMap);
      } else if (response.data.changePassword.user) {
        // TODO change route to main
        router.push('/backoffice/session');
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
                id="password"
                name="newPassword"
                label="New Password"
                type="password"
                value={formik.values.newPassword}
                setValue={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />
            </Grid>
            <Grid item className={classes.inputContainer}>
              {tokenError ? <h1>{tokenError}</h1> : null}
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={Boolean(formik.errors.newPassword)}
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

export default withUrqlClient(createUrqlClient)(ChangePassword as any);

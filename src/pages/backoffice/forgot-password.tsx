import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import * as yup from 'yup';
import { CustomizedSnackbars } from '../../components/ui/CustomizedSnackbars';
import { Input } from '../../components/ui/Input';
import { LayoutCenterItem, LayoutContainer } from '../../containers/Layout';
import { useForgotPasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

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
    // width: '6rem',
    borderRadius: '0.7rem',
    color: 'white'
  },
  forgotPasswordButton: {
    cursor: 'pointer',
    color: theme.palette.text.secondary
  }
}));

const forgotPassword: React.FC = () => {
  const classes = useStyles();

  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  const validationSchema = yup.object({
    email: yup.string().required('Username is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('values', values);
      await forgotPassword(values);
      setComplete(true);
      setTimeout(() => {
        setComplete(false);
      }, 6000);
    }
  });

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="sm" columnsNumber={12}>
        <form onSubmit={formik.handleSubmit}>
          {complete && (
            <CustomizedSnackbars
              isOpen={complete}
              message="If an account exists, we sent you an email"
            />
          )}
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
                id="email"
                name="email"
                label="Username or Email"
                type="email"
                value={formik.values.email}
                setValue={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={Boolean(formik.errors.email)}
                className={classes.button}
              >
                Forgot Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </LayoutCenterItem>
    </LayoutContainer>
  );
};

export default withUrqlClient(createUrqlClient)(forgotPassword);

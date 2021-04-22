import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { InputButton } from '../../../../components/ui/Inputs/InputButton';
import { LayoutContainer, LayoutWrapper } from '../../../../containers/Layout';

const useStyles = makeStyles((theme: Theme) => ({
  backButton: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  settingsTitle: {
    marginTop: '1.2rem',
    fontSize: '1.2rem'
  },
  settingsTitleBold: {
    fontSize: '1.2rem',
    fontWeight: 800
  },
  inputTitle: {
    margin: 0,
    fontSize: '0.7rem'
  }
}));

const settings: React.FC = () => {
  const classes = useStyles();

  const validationSchema = yup.object({
    title: yup.string().required('Username is required')
  });

  const validationSchemaDeleteAll = yup.object({
    deleteAll: yup
      .string()
      .matches(/^DELETE ALL$/, 'Type DELETE ALL')
      .required('DELETE ALL is required')
  });

  const validationSchemaDelete = yup.object({
    deleteAll: yup
      .string()
      .matches(/^DELETE SELECTED$/, 'Type DELETE SELECTED')
      .required('DELETE SELECTED is required')
  });

  const formikTitle = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setErrors }) => {
      if (!values) {
        // setErrors({ title: '' });
      } else {
        // TODO make a call
      }
    }
  });

  const formikDeleteAll = useFormik({
    initialValues: {
      deleteAll: ''
    },
    validationSchema: validationSchemaDeleteAll,
    onSubmit: async (values, { setErrors }) => {
      if (!values) {
        // setErrors({ deleteAll: '' });
      } else {
        // TODO make a call
      }
    }
  });

  const formikDelete = useFormik({
    initialValues: {
      delete: ''
    },
    validationSchema: validationSchemaDelete,
    onSubmit: async (values, { setErrors }) => {
      if (!values) {
        // setErrors({ deleteAll: '' });
      } else {
        // TODO make a call
      }
    }
  });

  return (
    <LayoutContainer breakdownPoint="md" center>
      <LayoutWrapper breakdownPoint="md" columnsNumber={7}>
        <Grid
          item
          container
          direction="column"
          justify="space-around"
          alignItems="flex-start"
        >
          <Box>
            <IconButton
              className={classes.backButton}
              onClick={() => {
                console.log('go back');
              }}
              disableRipple
            >
              <ArrowBackIosIcon />
            </IconButton>
            <p className={classes.settingsTitle}>
              Folder settings:
              <span className={classes.settingsTitleBold}> FOLDER NAME</span>
            </p>
          </Box>

          <InputButton
            id="title"
            name="title"
            label="Title"
            value={formikTitle.values.title}
            handleChange={formikTitle.handleChange}
            handleSubmit={formikTitle.handleSubmit}
            isButtonDisabled={Boolean(formikTitle.errors.title)}
            error={
              formikTitle.touched.title && Boolean(formikTitle.errors.title)
            }
            helperText={formikTitle.touched.title && formikTitle.errors.title}
            buttonColor="primary"
            buttonLabel="UPDATE"
          />

          <InputButton
            id="deleteAll"
            name="deleteAll"
            label="Delete all"
            value={formikDeleteAll.values.deleteAll}
            handleChange={formikDeleteAll.handleChange}
            handleSubmit={formikDeleteAll.handleSubmit}
            isButtonDisabled={Boolean(formikDeleteAll.errors.deleteAll)}
            error={
              formikDeleteAll.touched.deleteAll &&
              Boolean(formikDeleteAll.errors.deleteAll)
            }
            helperText={
              formikDeleteAll.touched.deleteAll &&
              formikDeleteAll.errors.deleteAll
            }
            buttonColor="error"
            buttonLabel="Remove Selected"
          >
            <p className={classes.inputTitle}>
              To remove <b>FOLDER</b> with all photos type <b>DELETE ALL</b> and
              click button
            </p>
          </InputButton>

          <p>INPUT DROPDOWN BUTTON</p>
          {/* <CheckboxTreeView /> */}

          <InputButton
            id="delete"
            name="delete"
            label="Delete "
            value={formikDelete.values.delete}
            handleChange={formikDelete.handleChange}
            handleSubmit={formikDelete.handleSubmit}
            isButtonDisabled={Boolean(formikDelete.errors.delete)}
            error={
              formikDelete.touched.delete && Boolean(formikDelete.errors.delete)
            }
            helperText={
              formikDelete.touched.delete && formikDelete.errors.delete
            }
            buttonColor="error"
            buttonLabel="Remove Selected"
          >
            <p className={classes.inputTitle}>
              To remove <b>selected</b> photos type <b>DELETE SELECTED</b> and
              click REMOVE SELECTED button
            </p>
          </InputButton>
        </Grid>
      </LayoutWrapper>
    </LayoutContainer>
  );
};

export default settings;

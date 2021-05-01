import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import React, { useState } from 'react';
import * as yup from 'yup';
import { CustomDialog } from '../../../components/ui/CustomDialog';
import { CustomDialogActions } from '../../../components/ui/CustomDialogActions';
import { Input } from '../../../components/ui/Inputs/Input';
import { LayoutBorder } from '../../../components/ui/LayoutBorder';
import { SideContentContainer } from '../../../components/ui/SideContentContainer';
import { WorkCard } from '../../../components/ui/WorkCard/WorkCard';
import {
  LayoutCenterItem,
  LayoutContainer,
  LayoutRightItem,
  LayoutWrapper
} from '../../../containers/Layout';
import {
  useCreateSessionMutation,
  useSessionsQuery
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';

const useStyles = makeStyles((theme: Theme) => ({
  dialogButtons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    borderRadius: '0.7rem',
    color: 'white'
  },
  card: {
    height: '10rem',
    margin: '1rem 1rem 0 1rem'
  },
  folderIconButton: {
    alignSelf: 'start',
    '& .MuiIconButton-label': {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  settingsBox: {
    height: '2rem',
    width: '100%'
  },
  formDialog: {
    height: '12rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
}));

const Index: React.FC = () => {
  const classes = useStyles();

  const [{ data, fetching }] = useSessionsQuery();

  const [, createSession] = useCreateSessionMutation();
  const DummyArr = [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false
  ];

  const [session, setSession] = useState(undefined);

  const [open, setOpen] = React.useState(false);

  const validationSchema = yup.object({
    title: yup.string().required('Title is required')
  });

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      const { data, error } = await createSession({ input: values });

      if (!error && !data?.createSession.errors) {
        formik.values.title = '';
        setOpen(false);
      }
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    formik.values.title = '';
    setOpen(false);
  };

  const renderSideContainerContent = () => {
    if (!fetching && data.sessions) {
      return data.sessions.map((folder) => (
        <IconButton
          onClick={() => {
            setSession(folder.id);
          }}
          className={`${classes.folderIconButton} ${classes.iconButton}`}
          disableRipple
          key={folder.id}
        >
          {session === folder.id ? (
            <FolderOpenIcon style={{ fontSize: 50 }} />
          ) : (
            <FolderIcon style={{ fontSize: 50 }} />
          )}
          <p style={{ fontSize: 10 }}>{folder.title}</p>
        </IconButton>
      ));
    }
  };

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="md" columnsNumber={5}>
        <SideContentContainer containerEast center={false}>
          <div>
            <IconButton
              onClick={handleClickOpen}
              className={`${classes.folderIconButton} ${classes.iconButton}`}
              disableRipple
            >
              <CreateNewFolderIcon style={{ fontSize: 50 }} />
              <p style={{ fontSize: 10 }}>ADD NEW</p>
            </IconButton>
            {/* render side folders */}
            {renderSideContainerContent()}
          </div>
        </SideContentContainer>
        <LayoutBorder />
      </LayoutCenterItem>

      {session && (
        <LayoutWrapper breakdownPoint="md" columnsNumber={7}>
          {/* settings Button */}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            className={classes.settingsBox}
          >
            <NextLink href={`/backoffice/session/settings/${session}`} passHref>
              <IconButton
                className={classes.iconButton}
                onClick={() => {}}
                disableRipple
              >
                <SettingsIcon />
              </IconButton>
            </NextLink>
          </Box>

          <LayoutRightItem breakdownPoint="md" columnsNumber={12}>
            {DummyArr.map((el, i) => (
              <WorkCard
                customClass={classes.card}
                backoffice={true}
                testPhoto={el}
                key={Math.random()}
                index={i}
              />
            ))}

            {/* ADD PHOTO BUTTON */}

            <Grid container item md={4} style={{ justifyContent: 'center' }}>
              <IconButton
                className={classes.iconButton}
                onClick={() => {
                  // here comes add photo modal
                }}
                disableRipple
              >
                <AddCircleIcon style={{ fontSize: 50 }} />
              </IconButton>
            </Grid>
          </LayoutRightItem>
        </LayoutWrapper>
      )}
      <CustomDialog isOpen={open} title="Create new folder">
        <form onSubmit={formik.handleSubmit} className={classes.formDialog}>
          <Input
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            setValue={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <CustomDialogActions
            handleClose={closeDialog}
            isButtonDisabled={Boolean(formik.errors.title)}
          />
        </form>
      </CustomDialog>
    </LayoutContainer>
  );
};

export default withUrqlClient(createUrqlClient)(Index);

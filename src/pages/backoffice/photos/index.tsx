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
  useBackofficeFoldersQuery,
  useBackofficePhotosQuery,
  useCreateBackofficeFolderMutation,
  useCreateBackofficePhotoMutation
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';

const useStyles = makeStyles((theme: Theme) => ({
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
  },
  test: {
    backgroundColor: 'red'
  }
}));

const Index: React.FC = () => {
  const classes = useStyles();

  const [, createBackofficeFolder] = useCreateBackofficeFolderMutation();

  const [, createBackofficePhoto] = useCreateBackofficePhotoMutation();

  const [{ data, fetching }] = useBackofficeFoldersQuery();

  const [folder, setFolder] = useState(undefined);

  const [
    { data: photosData, fetching: photosFetching }
  ] = useBackofficePhotosQuery({
    variables: {
      folderId: folder
    }
  });

  const [openAddFolderDialog, setOpenAddFolderDialog] = React.useState(false);
  const [openAddPhotoDialog, setOpenAddPhotoDialog] = React.useState(false);

  const validationSchemaAddFolder = yup.object({
    title: yup.string().required('Title is required')
  });

  const validationSchemaAddPhoto = yup.object({
    title: yup.string().required('Title is required'),
    photoUrl: yup.string().required('URL is required')
  });

  const formikAddFolder = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: validationSchemaAddFolder,
    onSubmit: async (values, { setErrors }) => {
      const { data, error } = await createBackofficeFolder({ input: values });

      if (!error && !data?.createBackofficeFolder.errors) {
        formikAddFolder.values.title = '';
        setOpenAddFolderDialog(false);
      }
    }
  });

  const formikAddPhoto = useFormik({
    initialValues: {
      title: '',
      photoUrl: ''
    },
    validationSchema: validationSchemaAddFolder,
    onSubmit: async (values, { setErrors }) => {
      const { data, error } = await createBackofficePhoto({
        input: {
          folderId: folder,
          ...values
        }
      });

      if (!error && !data?.createBackofficePhoto.errors) {
        formikAddPhoto.values.title = '';
        formikAddPhoto.values.photoUrl = '';
        setOpenAddFolderDialog(false);
      }
    }
  });

  const renderSideContainerContent = () => {
    if (!fetching && data.backofficeFolders) {
      return data.backofficeFolders.map((backofficeFolder) => (
        <IconButton
          onClick={() => {
            setFolder(backofficeFolder.id);
          }}
          className={`${classes.folderIconButton} ${classes.iconButton}`}
          disableRipple
          key={backofficeFolder.id}
        >
          {folder === backofficeFolder.id ? (
            <FolderOpenIcon style={{ fontSize: 50 }} />
          ) : (
            <FolderIcon style={{ fontSize: 50 }} />
          )}
          <p style={{ fontSize: 10 }}>{backofficeFolder.title}</p>
        </IconButton>
      ));
    }
  };

  const displayCards =
    photosData && !photosFetching && photosData.backofficePhotos.length > 0;

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="md" columnsNumber={5}>
        <SideContentContainer containerEast center={false}>
          <div>
            <IconButton
              onClick={() => setOpenAddFolderDialog(true)}
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

      {folder && (
        <LayoutWrapper
          breakdownPoint="md"
          columnsNumber={7}
          alignSelfProp="baseline"
        >
          {/* settings Button */}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            className={classes.settingsBox}
          >
            <NextLink href={`/backoffice/photos/settings/${folder}`} passHref>
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
            {displayCards &&
              photosData.backofficePhotos.map((photo) => (
                <WorkCard
                  customClass={classes.card}
                  backoffice={true}
                  title={photo.title}
                  photoUrl={photo.photoUrl}
                  key={photo.id}
                />
              ))}

            {/* ADD PHOTO BUTTON */}
            <Grid
              className={!displayCards && classes.card}
              container
              item
              md={4}
              style={{ justifyContent: 'center' }}
            >
              <IconButton
                className={classes.iconButton}
                onClick={() => setOpenAddPhotoDialog(true)}
                disableRipple
              >
                <AddCircleIcon style={{ fontSize: 50 }} />
              </IconButton>
            </Grid>
          </LayoutRightItem>
        </LayoutWrapper>
      )}

      {/* New Folder Dialog */}
      <CustomDialog isOpen={openAddFolderDialog} title="Create new folder">
        <form
          onSubmit={formikAddFolder.handleSubmit}
          className={classes.formDialog}
        >
          <Input
            id="title"
            name="title"
            label="Title"
            value={formikAddFolder.values.title}
            setValue={formikAddFolder.handleChange}
            error={
              formikAddFolder.touched.title &&
              Boolean(formikAddFolder.errors.title)
            }
            helperText={
              formikAddFolder.touched.title && formikAddFolder.errors.title
            }
          />
          <CustomDialogActions
            handleClose={() => {
              formikAddFolder.values.title = '';
              setOpenAddFolderDialog(false);
            }}
            isButtonDisabled={Boolean(formikAddFolder.errors.title)}
          />
        </form>
      </CustomDialog>

      {/* Add Photo Dialog */}
      <CustomDialog isOpen={openAddPhotoDialog} title="Add new photo">
        <form
          onSubmit={formikAddPhoto.handleSubmit}
          className={classes.formDialog}
        >
          <Input
            id="title"
            name="title"
            label="Title"
            value={formikAddPhoto.values.title}
            setValue={formikAddPhoto.handleChange}
            error={
              formikAddPhoto.touched.title &&
              Boolean(formikAddPhoto.errors.title)
            }
            helperText={
              formikAddPhoto.touched.title && formikAddPhoto.errors.title
            }
          />
          <Input
            id="photoUrl"
            name="photoUrl"
            label="Photo URL"
            value={formikAddPhoto.values.photoUrl}
            setValue={formikAddPhoto.handleChange}
            error={
              formikAddPhoto.touched.photoUrl &&
              Boolean(formikAddPhoto.errors.photoUrl)
            }
            helperText={
              formikAddPhoto.touched.photoUrl && formikAddPhoto.errors.photoUrl
            }
          />
          <CustomDialogActions
            handleClose={() => {
              formikAddPhoto.values.title = '';
              formikAddPhoto.values.photoUrl = '';
              setOpenAddPhotoDialog(false);
            }}
            isButtonDisabled={Boolean(formikAddPhoto.errors.title)}
          />
        </form>
      </CustomDialog>
    </LayoutContainer>
  );
};

export default withUrqlClient(createUrqlClient)(Index);

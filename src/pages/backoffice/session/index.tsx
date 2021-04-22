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
import NextLink from 'next/link';
import React, { useState } from 'react';
import { LayoutBorder } from '../../../components/ui/LayoutBorder';
import { SideContentContainer } from '../../../components/ui/SideContentContainer';
import { WorkCard } from '../../../components/ui/WorkCard/WorkCard';
import {
  LayoutCenterItem,
  LayoutContainer,
  LayoutRightItem,
  LayoutWrapper
} from '../../../containers/Layout';

interface Folder {
  active: boolean;
  title: string;
  to: string;
}

const useStyles = makeStyles((theme: Theme) => ({
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
  }
}));

const session: React.FC = () => {
  const classes = useStyles();

  const testData = [
    { active: false, title: 'test', to: '' },
    { active: false, title: 'test', to: '' },
    { active: false, title: 'test', to: '' },
    { active: false, title: 'test', to: '' },
    { active: false, title: 'test', to: '' },
    { active: false, title: 'test', to: '' },
    { active: false, title: 'test', to: '' },
    { active: false, title: 'test', to: '' },
    { active: false, title: 'test', to: '' },
    { active: false, title: 'test', to: '' }
  ];

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

  const [folders, setFolders] = useState<Folder[]>(testData);

  const [selectedSession, setSelectedSession] = useState(undefined);

  const [session, setSession] = useState(undefined);

  const selectFolderHandler = (index) => {
    let newArray = [...folders];
    newArray.forEach((element, i) => {
      if (i === index) {
        setSession(index);
        element.active = true;
      } else {
        element.active = false;
      }
    });
    setFolders(newArray);
    setSelectedSession(index);
  };

  const renderSideContainerContent = () => {
    return folders.map((folder, i) => (
      <IconButton
        onClick={() => {
          selectFolderHandler(i);
        }}
        className={`${classes.folderIconButton} ${classes.iconButton}`}
        disableRipple
        key={i}
      >
        {folder.active ? (
          <FolderOpenIcon style={{ fontSize: 50 }} />
        ) : (
          <FolderIcon style={{ fontSize: 50 }} />
        )}
        <p style={{ fontSize: 10 }}>{folder.title}</p>
      </IconButton>
    ));
  };

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="md" columnsNumber={5}>
        <SideContentContainer containerEast center={false}>
          <div>
            <IconButton
              onClick={() => {
                // create new folder modal
              }}
              className={`${classes.folderIconButton} ${classes.iconButton}`}
              disableRipple
            >
              <CreateNewFolderIcon style={{ fontSize: 50 }} />
              <p style={{ fontSize: 10 }}>ADD NEW</p>
            </IconButton>
            {renderSideContainerContent()}
          </div>
        </SideContentContainer>
        <LayoutBorder />
      </LayoutCenterItem>
      {session >= 0 && (
        <LayoutWrapper breakdownPoint="md" columnsNumber={7}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            className={classes.settingsBox}
          >
            <NextLink
              href={`/backoffice/session/settings/${selectedSession}`}
              passHref
            >
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
    </LayoutContainer>
  );
};

export default session;

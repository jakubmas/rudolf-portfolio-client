import { Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';

interface Tab {
  to: string;
  label: string;
  active: boolean;
}

// TODO Refactor Navbar component to smaller pieces
// TODO SSR fix, when you reload a page on a backoffice the navbar is undefined (steps to reproduce: login, refresh -> navbar should be empty)
const useStyles = makeStyles((theme: Theme) => {
  return {
    toolbarMargin: {
      ...theme.mixins.toolbar,
      marginBottom: '3em'
    },
    navbarContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      margin: 0
    },
    toolbarContainer: {
      marginLeft: '5%',
      marginRight: '5%',
      '& .MuiTabs-flexContainer': {
        justifyContent: 'space-evenly'
      }
    },
    logo: {
      fontSize: '0.7rem',
      lineHeight: '1'
    },
    logoContainer: {
      marginLeft: '2rem',
      padding: 0,
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    tab: {
      textTransform: 'none',
      fontSize: '1rem',
      minWidth: 10,
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    languageToggler: {
      fontSize: '0.7rem'
    },
    bottomLine: {
      borderTop: '1px solid',
      borderColor: theme.palette.text.primary,
      width: '90%',
      margin: '0 auto',
      borderRadius: '200px'
    },
    tabsContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-evenly'
    },
    tabActive: {
      borderTop: '1px solid',
      borderColor: theme.palette.text.primary,
      width: '120%'
    },
    tabInactive: {
      border: '1px solid transparent',
      width: '120%'
    },
    tabButtonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box'
    },
    drawer: {
      backgroundColor: theme.palette.background.default,
      width: '30vw',
      [theme.breakpoints.down('xs')]: {
        width: '100vw'
      }
    },
    drawerItem: {
      ...theme.typography,
      display: 'flex',
      paddingBottom: '1.2rem',
      justifyContent: 'center',
      fontSize: '1.2rem',
      fontWeight: 300,
      [theme.breakpoints.down('xs')]: {
        width: '100vw',
        fontSize: '2rem'
      }
    },
    drawerListContainer: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    drawerLogoContainer: {
      justifyContent: 'center',
      '& .MuiTypography-root': {
        padding: '1rem',
        fontSize: '1.1rem',
        fontWeight: 300
      },
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          backgroundColor: 'transparent'
        },
        '& .MuiTypography-root': {
          fontSize: '1.5rem',
          fontWeight: 300
        }
      }
    },
    menuButton: {
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    drawerCloseButton: {
      alignSelf: 'start',
      paddingBottom: '5vh',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    drawerLogoutButton: {
      // marginBottom: '10vh',
      justifyContent: 'center',
      '& .MuiTypography-root': {
        fontSize: '1.1rem',
        fontWeight: 300
      }
    },
    drawerLanguageToggler: {
      marginBottom: '10vh',
      justifyContent: 'center',
      '& .MuiTypography-root': {
        fontSize: '1.1rem',
        fontWeight: 300
      }
    }
  };
});

export const Navbar: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles();

  const router = useRouter();
  const isBackoffice =
    router.pathname.substring(1).split('/')[0] === 'backoffice';

  const [{ data, fetching }] = useMeQuery();

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const iOS =
    (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));

  const userPage = [
    {
      to: '/work',
      label: 'Work',
      active: false
    },
    {
      to: '/about',
      label: 'About',
      active: false
    },
    {
      to: '/contact',
      label: 'Contact',
      active: false
    },
    {
      to: '/backoffice/login',
      label: 'Backoffice',
      active: false
    }
  ];

  let backoffice = [];

  let backofficeTabs = [
    {
      to: '/backoffice/photos',
      label: 'Photos',
      active: false
    },
    {
      to: '/backoffice/landing',
      label: 'Landing',
      active: false
    },
    {
      to: '/backoffice/work',
      label: 'Work',
      active: false
    },
    {
      to: '/backoffice/about',
      label: 'About',
      active: false
    },
    {
      to: '/backoffice/contact',
      label: 'Contact',
      active: false
    }
  ];

  if (fetching) {
  } else if (!data?.me) {
    backoffice = [];
  } else {
    backoffice = backofficeTabs;
  }

  const [tabs, setTabs] = useState<Tab[]>(isBackoffice ? backoffice : userPage);

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleChange = (index: number, activeTab: Tab) => {
    let newArray = [...tabs];
    newArray.forEach((element) => {
      element.active = false;
    });
    newArray[index] = { ...activeTab, active: true };
    setTabs(newArray);
  };

  const handleDisacitveTabs = () => {
    let newArray = [...tabs];
    newArray.forEach((element) => {
      element.active = false;
    });
    setTabs(newArray);
  };

  useEffect(() => {
    let currentTabs = isBackoffice ? backoffice : userPage;

    let newArray = [...currentTabs];
    newArray.forEach((element) => {
      if (element.to === window.location.pathname) element.active = true;
    });
    setTabs(newArray);
  }, [router]);

  useEffect(() => {
    if (!matchesSmall && !matchesExtraSmall) {
      setOpenDrawer(false);
    }
  }, [matchesExtraSmall, matchesSmall]);

  const renderTabs = () => {
    return tabs.map((tab, i) => (
      <div className={classes.tabButtonContainer} key={tab.label}>
        <NextLink href={tab.to} passHref>
          <Button
            disableRipple
            className={classes.tab}
            onClick={() => handleChange(i, tab)}
          >
            {tab.label}
          </Button>
        </NextLink>
        {
          <div
            className={tab.active ? classes.tabActive : classes.tabInactive}
          />
        }
      </div>
    ));
  };

  const logoButton = (
    <NextLink href="/" passHref>
      <Button
        disableRipple
        className={classes.logoContainer}
        onClick={() => {
          handleDisacitveTabs();
          setOpenDrawer(false);
        }}
      >
        <Typography component="p" className={classes.logo}>
          Rudolf
          <br />
          Maslowski
        </Typography>
      </Button>
    </NextLink>
  );

  const languageToggler = (
    <Typography component="p" className={classes.languageToggler}>
      PL/<strong>EN</strong>
    </Typography>
  );

  const logoutButton = data?.me && isBackoffice && (
    <Tooltip title="logout">
      <IconButton
        onClick={() => {
          logout();
        }}
        disableRipple
        disabled={logoutFetching}
      >
        <ExitToApp />
      </IconButton>
    </Tooltip>
  );

  const largeNavbar = (
    <>
      {logoButton}
      <div className={classes.tabsContainer}>{renderTabs()}</div>
      {logoutButton}
      {languageToggler}
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{
          paper: classes.drawer
        }}
      >
        <div>
          <List disablePadding className={classes.drawerListContainer}>
            <ListItem className={classes.drawerLogoContainer}>
              {matchesExtraSmall && (
                <IconButton
                  className={classes.drawerCloseButton}
                  onClick={() => setOpenDrawer(false)}
                  disableRipple
                >
                  <CloseIcon />
                </IconButton>
              )}
              {logoButton}
            </ListItem>
            <div>
              {tabs.map((tab, i) => (
                <NextLink href={tab.to} passHref key={tab.to}>
                  <ListItem
                    key={`${tab}${i}`}
                    button
                    selected={tab.active}
                    onClick={() => {
                      setOpenDrawer(false);
                      handleChange(i, tab);
                    }}
                  >
                    <ListItemText
                      className={classes.drawerItem}
                      disableTypography
                    >
                      {tab.label}
                    </ListItemText>
                  </ListItem>
                </NextLink>
              ))}
            </div>

            <ListItem className={classes.drawerLogoutButton}>Logout</ListItem>
            <ListItem className={classes.drawerLanguageToggler}>
              {languageToggler}
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
      <IconButton
        className={classes.menuButton}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon />
      </IconButton>
      {logoButton}
    </>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        className={classes.navbarContainer}
      >
        <Toolbar disableGutters className={classes.toolbarContainer}>
          {matchesSmall ? drawer : largeNavbar}
        </Toolbar>
        {!matchesExtraSmall && <div className={classes.bottomLine} />}
      </AppBar>
      <Toolbar />
    </>
  );
};

import { Grid, GridSize } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: 'calc(100vh - 64px - 63px)',
    padding: '0 5%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '2rem'
    }
  },
  centerContentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: '2rem 2rem'
  },
  rightContentContainer: {
    padding: '0, 2rem 2rem 2rem'
  }
}));

type LayoutContainerProps = {
  breakdownPoint: Breakpoint;
  layoutClass?: string;
  center?: boolean;
};

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  breakdownPoint,
  layoutClass,
  center = false,
  children
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMedium = useMediaQuery(theme.breakpoints.down(breakdownPoint));
  // const { pathname } = useLocation()

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [pathname])

  return (
    <Grid
      justify={center ? 'center' : null}
      container
      direction={matchesMedium ? 'column' : 'row'}
      className={`${classes.container} ${layoutClass && layoutClass}`}
    >
      {children}
    </Grid>
  );
};

type LayoutCenterItemProps = {
  columnsNumber: GridSize;
  breakdownPoint: Breakpoint;
  layoutClass?: string;
};

export const LayoutCenterItem: FunctionComponent<LayoutCenterItemProps> = ({
  columnsNumber,
  breakdownPoint,
  layoutClass,
  children
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMedium = useMediaQuery(theme.breakpoints.down(breakdownPoint));

  return (
    <Grid
      item
      md={matchesMedium ? 12 : columnsNumber}
      className={`${classes.centerContentContainer} ${
        layoutClass && layoutClass
      }`}
    >
      {children}
    </Grid>
  );
};

type LayoutWrapperProps = {
  breakdownPoint: Breakpoint;
  columnsNumber: GridSize;
};

export const LayoutWrapper: FunctionComponent<LayoutWrapperProps> = ({
  columnsNumber,
  breakdownPoint,
  children
}) => {
  // const classes = useStyles();
  const theme = useTheme();
  const matchesMedium = useMediaQuery(theme.breakpoints.down(breakdownPoint));
  return (
    <Grid
      container
      item
      md={matchesMedium ? 12 : columnsNumber}
      // className={classes.rightContentContainer}
    >
      {children}
    </Grid>
  );
};

type LayoutRightItemProps = {
  columnsNumber: GridSize;
  breakdownPoint: Breakpoint;
  layoutClass?: string;
};
export const LayoutRightItem: FunctionComponent<LayoutRightItemProps> = ({
  columnsNumber,
  breakdownPoint,
  layoutClass,
  children
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMedium = useMediaQuery(theme.breakpoints.down(breakdownPoint));

  return (
    <Grid
      container
      className={`${classes.rightContentContainer} ${
        layoutClass && layoutClass
      }`}
    >
      <Grid
        container
        item
        md={matchesMedium ? 12 : columnsNumber}
        style={{ overflow: 'scroll', maxHeight: '80vh' }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

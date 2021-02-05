import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { ImageContainer } from '../components/ui/ImageContainer';
import { SideContentContainer } from '../components/ui/SideContentContainer';
import { LayoutCenterItem, LayoutContainer } from '../containers/Layout';

const useStyles = makeStyles((theme: Theme) => ({
  rotatedLogo: {
    fontSize: '2.5rem',
    transform: 'rotate(-90deg)',
    height: 'fit-content',
    letterSpacing: '1.2rem'
  },
  mediumLogo: {
    fontSize: '4.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.2rem'
    }
  }
}));

export const index: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMedium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="md" columnsNumber={4}>
        <Typography
          variant="h2"
          component="h2"
          className={matchesMedium ? classes.mediumLogo : classes.rotatedLogo}
        >
          RUDOLF
          <br />
          MASLOWSKI
        </Typography>
      </LayoutCenterItem>
      <LayoutCenterItem breakdownPoint="md" columnsNumber={4}>
        <ImageContainer
          srcImage="/assets/LandingPage-photo.png"
          altImage="Landing Page photography"
        />
      </LayoutCenterItem>
      <LayoutCenterItem breakdownPoint="md" columnsNumber={4}>
        <SideContentContainer />
      </LayoutCenterItem>
    </LayoutContainer>
  );
};

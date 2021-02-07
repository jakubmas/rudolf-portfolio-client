import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { ImageContainer } from '../components/ui/ImageContainer';
import { LayoutBorder } from '../components/ui/LayoutBorder';
import { SideContentContainer } from '../components/ui/SideContentContainer';
import { LayoutCenterItem, LayoutContainer } from '../containers/Layout';

const useStyles = makeStyles((theme: Theme) => ({
  aboutPhoto: {
    maxWidth: '60%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  }
}));

const about: React.FC = () => {
  const classes = useStyles();

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="md" columnsNumber={5}>
        <SideContentContainer containerEast />
        <LayoutBorder />
      </LayoutCenterItem>
      <LayoutCenterItem breakdownPoint="md" columnsNumber={7}>
        <ImageContainer
          srcImage="/assets/AboutMe-photo.png"
          altImage="About me photography"
          imageClass={classes.aboutPhoto}
        />
      </LayoutCenterItem>
    </LayoutContainer>
  );
};

export default about;

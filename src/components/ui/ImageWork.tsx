import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { useTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import aboutMePhoto from '../../assets/photos/AboutMe-photo.png';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    minWidth: '12.7rem',
    height: '18rem',
    margin: '0.7rem'
  },
  cardContainer: {
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      maxHeight: '80vh',
      overflow: 'scroll'
    }
  },
  media: {
    height: '100%'
  }
}));

export const ImageWork: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMedium = useMediaQuery(theme.breakpoints.down('md'));

  const [cardHovered, setCardHovered] = useState(false);

  const toggleRaised = () => {
    const state = cardHovered;
    setCardHovered(!state);
  };

  return (
    <Grid
      item
      md={matchesMedium ? 5 : 3}
      component={Card}
      className={classes.card}
      onMouseOver={toggleRaised}
      onMouseOut={toggleRaised}
      raised={cardHovered}
    >
      <CardMedia
        className={classes.media}
        image={aboutMePhoto}
        title="Main photo for session "
      />
    </Grid>
  );
};

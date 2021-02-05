import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { LayoutCenterItem } from '../../../containers/Layout';
import { WorkCardInformations } from './WorkCardInformations';

const useStyles = makeStyles(() => ({
  media: {
    height: '18rem',
    margin: '1rem 1rem 0 1rem'
  },
  cardWrapper: {
    cursor: 'pointer',
    width: '20rem',
    minHeight: '28rem'
  },
  cardTitle: {
    fontWeight: 100,
    fontSize: '1.4rem'
  }
}));

type WorkCardProps = {
  testPhoto: Boolean;
  index: number;
};

export const WorkCard: React.FC<WorkCardProps> = ({ testPhoto, index }) => {
  const classes = useStyles();

  const [cardHovered, setCardHovered] = useState(false);

  const toggleRaised = () => {
    const state = cardHovered;
    setCardHovered(!state);
  };

  const information = {
    model: 'Rogal DDL',
    place: 'Warsaw',
    equipment: 'Sony A6000, Sigma30 mm F.14'
  };

  return (
    <LayoutCenterItem breakdownPoint="sm" columnsNumber={4}>
      <Grid
        md
        item
        component={Card}
        className={classes.cardWrapper}
        onMouseOver={toggleRaised}
        onMouseOut={toggleRaised}
        // onClick={() => {
        //   history.push(`/work/session/${index}`)
        // }}
        raised={cardHovered}
      >
        <CardMedia
          className={classes.media}
          image={
            testPhoto
              ? '/assets/LandingPage-photo.png'
              : '/assets/Contact-photo.png'
          }
          title="Main photo for session "
        />
        <CardContent>
          <Typography gutterBottom component="h2" className={classes.cardTitle}>
            Sesja {index + 1}
          </Typography>
          <br />
          <WorkCardInformations information={information} />
        </CardContent>
      </Grid>
    </LayoutCenterItem>
  );
};

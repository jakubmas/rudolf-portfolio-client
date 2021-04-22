import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { LayoutCenterItem } from '../../../containers/Layout';
import { WorkCardButtons } from './WorkCardButtons';
import { WorkCardInformations } from './WorkCardInformations';

const useStyles = makeStyles(() => ({
  media: {
    height: '18rem',
    margin: '1rem 1rem 0 1rem'
  },

  cardContent: {
    paddingBottom: 0
  },
  cardTitle: {
    fontWeight: 100,
    fontSize: '1rem'
  },
  cardTitleSmall: {
    fontWeight: 400,
    fontSize: '0.9rem',
    textAlign: 'center'
  }
}));

type WorkCardProps = {
  testPhoto: Boolean;
  index: number;
  backoffice?: boolean;
  customClass?: string;
};

export const WorkCard: React.FC<WorkCardProps> = ({
  testPhoto,
  index,
  backoffice = false,
  customClass
}) => {
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
        onMouseOver={toggleRaised}
        onMouseOut={toggleRaised}
        raised={cardHovered}
      >
        <CardActionArea
          onClick={() => {
            console.log('elo co to ');
          }}
        >
          <CardMedia
            className={backoffice ? customClass : classes.media}
            image={
              testPhoto
                ? '/assets/LandingPage-photo.png'
                : '/assets/Contact-photo.png'
            }
            title="Main photo for session "
          />
          <CardContent className={classes.cardContent}>
            {!backoffice ? (
              <Typography
                gutterBottom
                component="h2"
                className={classes.cardTitle}
              >
                Sesja {index + 1}
              </Typography>
            ) : (
              <Typography
                gutterBottom
                component="p"
                className={classes.cardTitleSmall}
              >
                Sesja {index + 1}
              </Typography>
            )}
            {!backoffice && <br />}
            {!backoffice && <WorkCardInformations information={information} />}
          </CardContent>
        </CardActionArea>
        {backoffice && (
          <Grid container component={CardActions}>
            <WorkCardButtons />
          </Grid>
        )}
      </Grid>
    </LayoutCenterItem>
  );
};

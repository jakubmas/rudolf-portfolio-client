import React, { FunctionComponent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import { Grid } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { LayoutCenterItem } from '../../../containers/Layout'
import { WorkCardInformations } from './WorkCardInformations'

import TestPhoto from '../../../assets/photos/LandingPage-photo.png'
import Test2Photo from '../../../assets/photos/Contact-photo.png'

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
}))

type WorkCardProps = {
  testPhoto: Boolean
  index: number
}

export const WorkCard: FunctionComponent<WorkCardProps> = ({
  testPhoto,
  index
}) => {
  const classes = useStyles()

  const history = useHistory()
  const [cardHovered, setCardHovered] = useState(false)

  const toggleRaised = () => {
    const state = cardHovered
    setCardHovered(!state)
  }

  const information = {
    model: 'Rogal DDL',
    place: 'Warsaw',
    equipment: 'Sony A6000, Sigma30 mm F.14'
  }

  return (
    <LayoutCenterItem breakdownPoint="sm" columnsNumber={4}>
      <Grid
        md
        item
        component={Card}
        className={classes.cardWrapper}
        onMouseOver={toggleRaised}
        onMouseOut={toggleRaised}
        onClick={() => {
          history.push(`/work/session/${index}`)
        }}
        raised={cardHovered}
      >
        <CardMedia
          className={classes.media}
          image={testPhoto ? TestPhoto : Test2Photo}
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
  )
}

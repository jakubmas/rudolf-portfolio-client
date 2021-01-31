import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import toPairs from 'lodash.topairs'

const useStyles = makeStyles(() => ({
  cardInformationKey: {
    textTransform: 'capitalize'
  },
  cardInformationText: {
    fontSize: '0.7rem'
  }
}))

type WorkCardInformationsProps = {
  information: {
    model: string
    place: string
    equipment: string
  }
}

export const WorkCardInformations: FunctionComponent<WorkCardInformationsProps> = ({
  information
}) => {
  const classes = useStyles()

  const [pairedInformation, setPairedInformation] = useState([['', '']])

  useEffect(() => {
    const informationObjectToArray = toPairs(information)
    setPairedInformation(informationObjectToArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid item>
      {pairedInformation.map((text) => {
        return (
          <Grid container key={Math.random()}>
            <Grid item xs={4} md={3}>
              <Typography
                gutterBottom
                component="p"
                key={Math.random()}
                className={`${classes.cardInformationKey} ${classes.cardInformationText}`}
              >
                {text[0]}:
              </Typography>
            </Grid>
            <Grid item xs={8} md={9}>
              <Typography
                gutterBottom
                component="p"
                className={classes.cardInformationText}
                key={Math.random()}
              >
                {text[1]}
              </Typography>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}

import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme: Theme) => ({
  contentBorder: {
    height: '100%',
    borderRight: `1px solid ${theme.palette.text.primary}`
  }
}))

export const LayoutBorder: FunctionComponent = () => {
  const classes = useStyles()
  return <Grid item className={classes.contentBorder} />
}

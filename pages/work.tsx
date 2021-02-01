import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { WorkCard } from '../src/components/ui/WorkCard/WorkCard'
import { LayoutContainer } from '../src/containers/Layout'



const useStyles = makeStyles((theme: Theme) => ({
  layoutContainer: {
    marginTop: '7rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0
    }
  }
}))

export default function  Work () {
  const DummyArr = [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false
  ]
  const classes = useStyles()
  return (
    <LayoutContainer breakdownPoint="sm" layoutClass={classes.layoutContainer}>
      {DummyArr.map((el, i) => (
        <WorkCard testPhoto={el} key={Math.random()} index={i} />
      ))}
    </LayoutContainer>
  )
}

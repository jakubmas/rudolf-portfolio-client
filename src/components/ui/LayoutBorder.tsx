import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  contentBorder: {
    height: '100%',
    borderRight: `1px solid ${theme.palette.text.primary}`
  }
}));

export const LayoutBorder: React.FC = () => {
  const classes = useStyles();
  return <Grid item className={classes.contentBorder} />;
};

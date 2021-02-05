import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  footerContainer: {
    minHeight: '64px',
    backgroundColor: theme.palette.background.default
  },
  bottomLine: {
    borderTop: '1px solid',
    borderColor: theme.palette.text.primary,
    width: '90%',
    margin: '0 auto',
    borderRadius: '200px'
  }
}));

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footerContainer}>
      <div className={classes.bottomLine} />
    </footer>
  );
};

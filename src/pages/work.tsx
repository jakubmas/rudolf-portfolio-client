import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { WorkCardWIP } from '../components/ui/WorkCard/WorkCardWIP';
import { LayoutContainer } from '../containers/Layout';

const useStyles = makeStyles((theme: Theme) => ({
  layoutContainer: {
    marginTop: '7rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0
    }
  }
}));

const work: React.FC = () => {
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
  ];
  const classes = useStyles();
  return (
    <LayoutContainer breakdownPoint="sm" layoutClass={classes.layoutContainer}>
      {DummyArr.map((el, i) => (
        <WorkCardWIP testPhoto={el} key={Math.random()} index={i} />
      ))}
    </LayoutContainer>
  );
};

export default work;

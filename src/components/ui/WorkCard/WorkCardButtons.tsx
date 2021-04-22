import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  settingsBox: {
    width: '100%'
  },
  iconButton: {
    fontSize: '1.2rem'
  }
}));

type WorkCardButtonsProps = {};

export const WorkCardButtons: React.FC<WorkCardButtonsProps> = ({}) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.settingsBox}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <IconButton onClick={() => {}} disableRipple>
          <DeleteIcon className={classes.iconButton} />
        </IconButton>
        <IconButton onClick={() => {}} disableRipple>
          <CreateIcon className={classes.iconButton} />
        </IconButton>
      </Box>
    </Grid>
  );
};

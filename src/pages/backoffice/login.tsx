import Grid from '@material-ui/core/Grid';
// import { useTheme } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { LayoutCenterItem, LayoutContainer } from '../../containers/Layout';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    maxWidth: '30rem',
    minHeight: '20rem',
    backgroundColor: '#FFFFFF',
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: '1.2rem',
  },
  cssLabel: {
    '&$cssFocused': {
      color: 'red',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: 'red',
    },
  },
  cssFocused: {},
  notchedOutline: {},
}));

export default function Login() {
  const classes = useStyles();
  // const theme = useTheme()

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="sm" columnsNumber={12}>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.form}
        >
          <Grid item>
            <TextField label="E-mail" id="" variant="outlined" margin="dense" />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              id=""
              variant="outlined"
              margin="dense"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
        </Grid>
      </LayoutCenterItem>
    </LayoutContainer>
  );
}

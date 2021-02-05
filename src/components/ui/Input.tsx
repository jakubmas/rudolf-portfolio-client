import { Theme } from '@material-ui/core/styles/createMuiTheme';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  formHelperText: {
    position: 'absolute',
    bottom: '-2em',
    [theme.breakpoints.down('xs')]: {
      bottom: '-3em'
    }
  },
  cssLabel: {
    '&$cssFocused': {
      color: theme.palette.text.primary
    }
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.text.primary
    }
  },
  cssErrorLabel: {
    '&$cssFocused': {
      color: theme.palette.error
    }
  },
  cssErrorOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.error
    }
  },
  cssFocused: {},
  notchedOutline: {}
}));

export const Input = ({
  label,
  value,
  setValue,
  helperText,
  type = 'text',
  style = {}
}) => {
  const classes = useStyles();

  return (
    <TextField
      label={label}
      type={type}
      fullWidth
      variant="outlined"
      margin="dense"
      error={helperText.length !== 0}
      helperText={helperText}
      value={value}
      onChange={setValue}
      style={style}
      InputLabelProps={{
        classes: {
          root: `${
            helperText.length !== 0 ? classes.cssErrorLabel : classes.cssLabel
          }`,
          focused: classes.cssFocused
        }
      }}
      InputProps={{
        classes: {
          root: `${
            helperText.length !== 0
              ? classes.cssErrorOutlinedInput
              : classes.cssOutlinedInput
          }`,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline
        }
      }}
      FormHelperTextProps={{
        classes: {
          root: classes.formHelperText
        }
      }}
    />
  );
};

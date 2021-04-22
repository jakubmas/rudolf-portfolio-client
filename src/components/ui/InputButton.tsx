import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Input } from './Input';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    '& .MuiFormControl-fullWidth': {
      width: '60%'
    },
    width: '100%'
  },
  input: {
    backgroundColor: 'white',
    minWidth: '80%'
  },
  inputButtonWrapper: {
    alignItems: 'center'
  },
  button: {
    borderRadius: '0.7rem',
    color: 'white'
  }
}));

type LayoutContainerProps = {
  layoutClass?: string;
  center?: boolean;
  id: string;
  name: string;
  label: string;
  buttonLabel: string;
  value: string;
  error: boolean;
  helperText: string;
  handleChange: any;
  handleSubmit: any;
  isButtonDisabled: boolean;
  buttonColor: string;
  customClass?: any;
  type?: string;
  style?: object;
};

export const InputButton: React.FC<LayoutContainerProps> = ({
  id,
  name,
  label,
  buttonLabel,
  value,
  error,
  helperText,
  handleChange,
  handleSubmit,
  isButtonDisabled,
  buttonColor,
  children,
  type = 'text',
  style = {}
}) => {
  const classes = useStyles();

  const colors = {
    primary: '#7cc78d',
    error: '#c93131',
    success: '#7cb3c7'
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={classes.container}
    >
      <Box display="flex" flexDirection="column">
        {children}

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          className={classes.inputButtonWrapper}
        >
          <Input
            customClass={classes.input}
            id={id}
            name={name}
            label={label}
            value={value}
            setValue={handleChange}
            error={error}
            helperText={helperText}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: colors[buttonColor] }}
            disabled={isButtonDisabled}
            className={classes.button}
          >
            {buttonLabel}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

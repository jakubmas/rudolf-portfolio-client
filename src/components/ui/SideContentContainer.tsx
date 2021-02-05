import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

// import BehanceIcon from '../../assets/icons/behance-icon.svg'

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      overflow: 'scroll',
      maxHeight: '70vh',
      [theme.breakpoints.down('sm')]: {
        overflow: 'auto',
        maxHeight: '100%'
      }
    },
    containerPaddingEast: {
      [theme.breakpoints.down('xl')]: { paddingLeft: '3rem' },
      [theme.breakpoints.down('md')]: { paddingLeft: 0 }
    },
    containerPaggingWest: {
      [theme.breakpoints.down('xl')]: {
        paddingLeft: '3rem',
        paddingRight: '3rem'
      },
      [theme.breakpoints.down('md')]: { padding: 0 }
    },
    title: {
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
      fontWeight: 100,
      marginBottom: '3rem',
      width: '100%',
      [theme.breakpoints.down('md')]: {
        fontSize: '2rem',
        paddingTop: '2rem',
        textAlign: 'center'
      },
      [theme.breakpoints.down('sm')]: {
        paddingTop: '2rem',
        fontSize: '1.7rem',
        textAlign: 'center'
      }
    },
    textRegular: {
      fontSize: '0.9rem',
      lineHeight: '1.7rem',
      fontWeight: 300,
      marginRight: '3rem',
      width: '100%',
      paddingBottom: '2rem',
      [theme.breakpoints.down('md')]: {
        margin: 0
      }
    },
    bottomBorder: {
      width: '90%',
      margin: '0 auto',
      borderBottom: `0.5px solid ${theme.palette.text.primary}`
    },
    iconsContainer: {
      paddingLeft: '2rem'
    }
  };
});

// [
//   {
//     type: 'title',
//     text: 'asdhahdoiaho'
//   },
//   {
//     type: 'paragraph',
//     text: 'loremIpsum'
//   },
//   {
//     type: 'credentials',
//     items: [
//       {
//         icon: 'instagram',
//         text: 'ktos',
//         url: 'http://blablablabla.pl'
//       },
//       {
//         icon: 'instagram',
//         text: 'ktos',
//         url: 'http://blablablabla.pl'
//       },
//       {
//         icon: 'instagram',
//         text: 'ktos',
//         url: 'http://blablablabla.pl'
//       },
//     ]
//   }
// ]

type SideContentContainerProps = {
  containerEast?: Boolean;
  containerWest?: Boolean;
  iconsSection?: Boolean;
};

export const SideContentContainer: React.FC<SideContentContainerProps> = (
  props
) => {
  const classes = useStyles();

  const { containerEast, containerWest, iconsSection } = props;

  return (
    <Grid container style={{ height: '100%' }}>
      <Grid
        alignContent="center"
        container
        className={`${classes.container} ${
          containerEast && classes.containerPaddingEast
        } ${containerWest && classes.containerPaggingWest}`}
      >
        <Typography component="h2" className={classes.title}>
          Lorem ipsum dolor sit amet
        </Typography>
        <Typography component="p" className={classes.textRegular}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          tincidunt mauris at bibendum pellentesque. Praesent lobortis varius
          congue. In et nunc et elit ullamcorper aliquam eu sit amet nulla. Nunc
          tempor mi quis leo interdum suscipit at in lorem. Pellentesque
          tristique auctor erat, nec aliquet nisi lobortis eget. Duis ultrices
          pulvinar nunc. Nulla lorem nunc, facilisis at arcu sit amet, aliquet
          luctus felis.
        </Typography>
        {/* <Typography component="p" className={classes.textRegular}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          tincidunt mauris at bibendum pellentesque. Praesent lobortis varius
          congue. In et nunc et elit ullamcorper aliquam eu sit amet nulla. Nunc
          tempor mi quis leo interdum suscipit at in lorem. Pellentesque
          tristique auctor erat, nec aliquet nisi lobortis eget. Duis ultrices
          pulvinar nunc. Nulla lorem nunc, facilisis at arcu sit amet, aliquet
          luctus felis.
        </Typography>
        <Typography component="p" className={classes.textRegular}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          tincidunt mauris at bibendum pellentesque. Praesent lobortis varius
          congue. In et nunc et elit ullamcorper aliquam eu sit amet nulla. Nunc
          tempor mi quis leo interdum suscipit at in lorem. Pellentesque
          tristique auctor erat, nec aliquet nisi lobortis eget. Duis ultrices
          pulvinar nunc. Nulla lorem nunc, facilisis at arcu sit amet, aliquet
          luctus felis.
        </Typography>
        <Typography component="p" className={classes.textRegular}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          tincidunt mauris at bibendum pellentesque. Praesent lobortis varius
          congue. In et nunc et elit ullamcorper aliquam eu sit amet nulla. Nunc
          tempor mi quis leo interdum suscipit at in lorem. Pellentesque
          tristique auctor erat, nec aliquet nisi lobortis eget. Duis ultrices
          pulvinar nunc. Nulla lorem nunc, facilisis at arcu sit amet, aliquet
          luctus felis.
        </Typography> */}
      </Grid>
      {iconsSection && (
        <Grid container>
          <Grid item className={classes.bottomBorder} />
          <Grid container direction="row" className={classes.iconsContainer}>
            {/* TODO: Change Icon Buttons, on click effect, also scroll option on side container when its full of content!! */}
            <IconButton style={{ backgroundColor: 'transparent' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton style={{ backgroundColor: 'transparent' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton style={{ backgroundColor: 'transparent' }}>
              <AlternateEmailIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

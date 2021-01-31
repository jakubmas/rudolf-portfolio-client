// import Box from '@material-ui/core/Box';
// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import React from 'react';
// // import Link from '../src/Link';
// // import { Header } from '../src/components/ui/Header';

// export default function Index() {
//   return (
//     <Container maxWidth="sm">
//       {/* <Header /> */}
//       <Box my={4}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Co tam byku
//         </Typography>
//         {/* <Link href="/about" color="secondary">
//           Go to the about page
//         </Link> */}
//       </Box>
//     </Container>
//   );
// }


import { Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { SideContentContainer } from '../src/components/ui/SideContentContainer'
import { LayoutCenterItem, LayoutContainer } from '../src/containers/Layout'


// import landingPagePhoto from '../src/assets/photos/LandingPage-photo.png'

const useStyles = makeStyles((theme: Theme) => ({
  rotatedLogo: {
    fontSize: '2.5rem',
    transform: 'rotate(-90deg)',
    height: 'fit-content',
    letterSpacing: '1.2rem'
  },
  mediumLogo: {
    fontSize: '4.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.2rem'
    }
  }
}))

export default function Index() {
  const classes = useStyles()
  const theme = useTheme()
  const matchesMedium = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="md" columnsNumber={4}>
        <Typography
          variant="h2"
          component="h2"
          className={matchesMedium ? classes.mediumLogo : classes.rotatedLogo}
        >
          RUDOLF
          <br />
          MASLOWSKI
        </Typography>
      </LayoutCenterItem>
      <LayoutCenterItem breakdownPoint="md" columnsNumber={4}>
        {/* <ImageContainer
          srcImage={landingPagePhoto}
          altImage="Landing Page photography"
        /> */}
      </LayoutCenterItem>
      <LayoutCenterItem breakdownPoint="md" columnsNumber={4}>
        <SideContentContainer />
      </LayoutCenterItem>
    </LayoutContainer>
  )
}

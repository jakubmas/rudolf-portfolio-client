// import Box from '@material-ui/core/Box';
// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import React from 'react';

// export default function About() {
//   return (
//     <Container maxWidth="sm">
//       <Box my={4}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Mordo
//         </Typography>
//       </Box>
//     </Container>
//   );
// }


import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { LayoutBorder } from '../src/components/ui/LayoutBorder'
import { SideContentContainer } from '../src/components/ui/SideContentContainer'
import { LayoutCenterItem, LayoutContainer } from '../src/containers/Layout'



const useStyles = makeStyles((theme: Theme) => ({
  aboutPhoto: {
    maxWidth: '60%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  }
}))

export default function About() {
  const classes = useStyles()

  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="md" columnsNumber={5}>
        <SideContentContainer containerEast />
        <LayoutBorder />
      </LayoutCenterItem>
      <LayoutCenterItem breakdownPoint="md" columnsNumber={7}>
        {/* <ImageContainer
          srcImage={aboutMePhoto}
          altImage="About me photography"
          imageClass={classes.aboutPhoto}
        /> */}
      </LayoutCenterItem>
    </LayoutContainer>
  )
}

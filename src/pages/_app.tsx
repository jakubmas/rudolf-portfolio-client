import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import React from 'react';
import { Footer } from '../components/ui/Footer';
import { Navbar } from '../components/ui/Navbar';
import theme from '../components/ui/theme';
import { createUrqlClient } from '../utils/createUrqlClient';

export default withUrqlClient(createUrqlClient, { ssr: false })(function MyApp(
  props
) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Navbar />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
});

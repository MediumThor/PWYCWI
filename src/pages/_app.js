import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, ServerStyleSheets } from '@material-ui/styles';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AuthProvider } from '../context/AuthContext';
import { SessionProvider } from 'next-auth/react';
import GoogleProvider from "next-auth/providers/google";


class MyApp extends App {

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>PWYC</title>
        </Head>

        <StylesProvider injectFirst>
          <ParallaxProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <AuthProvider>

              <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
              </SessionProvider>
            </AuthProvider>

          </ParallaxProvider>
        </StylesProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;

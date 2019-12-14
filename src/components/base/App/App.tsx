import React from 'react';
import Helmet from 'react-helmet';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import './App.css';
import CONSTS from 'consts';
import theme from 'components/themes';
import Router from 'components/base/Router/Router';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet
        titleTemplate={`%s | ${CONSTS.APP_NAME}`}
        defaultTitle={CONSTS.APP_NAME}
      />
      <Router />
    </ThemeProvider>
  );
}

export default App;

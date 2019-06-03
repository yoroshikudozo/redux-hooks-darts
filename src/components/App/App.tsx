import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Helmet from 'react-helmet';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import './App.css';
import CONSTS from '../../consts';
import theme from '../themes';

function App() {
  return (
    <Router>
      <Helmet titleTemplate={`%s | ${CONSTS.APP_NAME}`} defaultTitle={CONSTS.APP_NAME} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <>
          <Route path="/" component={() => <div>adsf</div>} />
        </>
      </ThemeProvider>
    </Router>
  );
}

export default App;

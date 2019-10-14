import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useDispatch } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import './App.css';
import CONSTS from 'consts';
import theme from 'components/themes';
import Router from 'components/base/Router/Router';
import { fetchPlayers, fetchPlayersCancel } from 'modules/users/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
    return () => {
      dispatch(fetchPlayersCancel());
    };
  });

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

import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import 'index.css';
import App from 'components/base/App/App';
import configureStore from 'modules/store/configureStore';
import * as serviceWorker from 'misc/serviceWorker';

const store = configureStore();

const wrapApp = (AppComponent: React.ElementType, store: Store) => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  import('modules/common/mock').then(mock => {
    mock.init();
    console.log('Init mock data.');
    ReactDOM.render(wrapApp(App, store), document.getElementById('root'));
  });
} else {
  ReactDOM.render(wrapApp(App, store), document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from 'modules/middlewares/api';
import rootReducer from 'modules/reducers';

const preloadedState = { auth: { isAuthenticated: true } };

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, api)),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}

export default configureStore;

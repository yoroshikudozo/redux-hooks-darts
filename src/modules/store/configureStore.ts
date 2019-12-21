import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'modules/reducers';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from 'modules/common/epics';

const preloadedState = { auth: { isAuthenticated: true } };

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R;
  }
}

export const epicMiddleware = createEpicMiddleware();

function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}

export default configureStore;

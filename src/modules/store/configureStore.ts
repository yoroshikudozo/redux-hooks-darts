import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { AppState } from 'modules/reducers';
import { createEpicMiddleware } from 'redux-observable';
import { AnyAction } from 'typescript-fsa';
import { rootEpic } from 'modules/common/epics';

const preloadedState = { auth: { isAuthenticated: true } };

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export const epicMiddleware = createEpicMiddleware<
  AnyAction,
  AnyAction,
  AppState
>();

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

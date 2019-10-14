import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { epicMiddleware } from 'modules/store/configureStore';

import Router from './Router';

const middlewares = [thunk, epicMiddleware];
const mockStore = createMockStore(middlewares);
const store = mockStore({ auth: { isAuthenticated: true } });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Router />
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

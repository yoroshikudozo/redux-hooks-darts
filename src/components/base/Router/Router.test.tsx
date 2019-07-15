import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';

import Router from './Router';

const mockStore = createMockStore();
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

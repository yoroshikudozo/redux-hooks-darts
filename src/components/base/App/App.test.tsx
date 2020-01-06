import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { epicMiddleware } from 'modules/store/configureStore';

import user1 from 'modules/users/mock/resources/user1';
import user2 from 'modules/users/mock/resources/user2';

import App from './App';

const middlewares = [thunk, epicMiddleware];
const mockStore = createMockStore(middlewares);
const store = mockStore({
  auth: { isAuthenticated: true },
  entities: { users: { byId: { 1: user1, 2: user2 }, allIds: ['1', '2'] } },
});

jest.mock('modules/users/api', () => {
  return {
    fetchPlayersRequest() {
      return { users: [{ id: '1' }, { id: '2' }] };
    },
  };
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

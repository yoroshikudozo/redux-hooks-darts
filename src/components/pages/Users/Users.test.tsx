import React from 'react';
import ReactDOM from 'react-dom';

import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { epicMiddleware } from 'modules/store/configureStore';

import user1 from 'modules/users/mock/resources/user1';
import user2 from 'modules/users/mock/resources/user2';

import Users from './Users';

const middlewares = [thunk, epicMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  entities: { users: { byId: { 1: user1, 2: user2 }, playerIds: ['2', '1'] } },
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
        <BrowserRouter>
          <Route component={Users} />
        </BrowserRouter>
      </Provider>,
      div,
    );
  });
  ReactDOM.unmountComponentAtNode(div);
});

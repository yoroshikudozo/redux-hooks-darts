import React from 'react';
import ReactDOM from 'react-dom';

import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { epicMiddleware } from 'modules/store/configureStore';

import UserDetail from './UserDetail';

const middlewares = [thunk, epicMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  entities: { users: { byId: {}, allIds: [] } },
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
          <Route component={UserDetail} />
        </BrowserRouter>
      </Provider>,
      div,
    );
  });
  ReactDOM.unmountComponentAtNode(div);
});

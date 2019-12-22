import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { epicMiddleware } from 'modules/store/configureStore';

import Users from './Users';

const middlewares = [thunk, epicMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  entities: { users: { byId: {}, allIds: [] } },
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Route component={Users} />
      </BrowserRouter>
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

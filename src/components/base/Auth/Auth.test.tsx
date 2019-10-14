import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import { epicMiddleware } from 'modules/store/configureStore';

import Auth from './Auth';
import Home from 'components/pages/Home/Home';

const middlewares = [thunk, epicMiddleware];
const mockStore = createMockStore(middlewares);
const store = mockStore({ auth: { isAuthenticated: true } });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Auth>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Auth>
      </BrowserRouter>
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { epicMiddleware } from 'modules/store/configureStore';

import Home from './Home';

const middlewares = [thunk, epicMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Route component={Home} />
      </BrowserRouter>
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

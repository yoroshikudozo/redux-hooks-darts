import React from 'react';
import ReactDOM from 'react-dom';

import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ROUTES from 'consts/routes';

import { epicMiddleware } from 'modules/store/configureStore';

import GamesPage from 'components/pages/Games/Games';

import CountUp from './CountUp';

const middlewares = [thunk, epicMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  entities: { users: { byId: {}, allIds: [] } },
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" exact={true}>
            <CountUp />
          </Route>
          <Route path={ROUTES.GAMES.ROOT} exact={true}>
            <GamesPage />
          </Route>
        </BrowserRouter>
      </Provider>,
      div,
    );
  });
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';

import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import ROUTES from 'consts/routes';

import Auth from 'components/base/Auth/Auth';
import CountUpPage from 'components/pages/Games/CountUp';
import GamesPage from 'components/pages/Games/Games';
import HomePage from 'components/pages/Home/Home';
import LoginPage from 'components/pages/Login/Login';
import CreateUserPage from 'components/pages/Users/CreateUser';
import UserDetailPage from 'components/pages/Users/UserDetail';
import UsersPage from 'components/pages/Users/Users';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.LOGIN} component={LoginPage} />
        <Auth>
          <Switch>
            <Route path={ROUTES.HOME} exact={true}>
              <HomePage />
            </Route>
            {/* Users */}
            <Route path={ROUTES.USERS.ROOT} exact={true}>
              <UsersPage />
            </Route>
            <Route path={`${ROUTES.USERS.DETAIL}/:id`}>
              <UserDetailPage />
            </Route>
            <Route path={ROUTES.USERS.CREATE}>
              <CreateUserPage />
            </Route>
            {/* Games */}
            <Route path={ROUTES.GAMES.ROOT} exact={true}>
              <GamesPage />
            </Route>
            <Route path={`${ROUTES.GAMES.COUNT_UP}/:hash`}>
              <CountUpPage />
            </Route>
          </Switch>
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

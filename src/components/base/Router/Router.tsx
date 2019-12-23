import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import ROUTES from 'consts/routes';

import Auth from 'components/base/Auth/Auth';

import HomePage from 'components/pages/Home/Home';
import LoginPage from 'components/pages/Login/Login';
import UsersPage from 'components/pages/Users/Users';
import CreateUserPage from 'components/pages/Users/CreateUser';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.LOGIN} component={LoginPage} />
        <Auth>
          <Switch>
            <Route path="/" exact={true} component={HomePage} />
            <Route
              path={ROUTES.USERS.ROOT}
              exact={true}
              component={UsersPage}
            />
            <Route
              path={ROUTES.USERS.CREATE}
              exact={true}
              component={() => <CreateUserPage id={'1'} />}
            />
          </Switch>
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

import React from 'react';

import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import ROUTES from 'consts/routes';

import Auth from 'components/base/Auth/Auth';
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
            <Route path={ROUTES.HOME} exact={true} component={HomePage} />
            <Route
              path={ROUTES.USERS.ROOT}
              exact={true}
              component={UsersPage}
            />
            <Route
              path={`${ROUTES.USERS.ROOT}/detail/:id`}
              component={UserDetailPage}
            />
            <Route
              path={ROUTES.USERS.CREATE}
              exact={true}
              component={CreateUserPage}
            />
          </Switch>
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

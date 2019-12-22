import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Auth from 'components/base/Auth/Auth';

import Home from 'components/pages/Home/Home';
import Login from 'components/pages/Login/Login';
import Users from 'components/pages/Users/Users';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Auth>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/users" exact={true} component={Users} />
          </Switch>
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

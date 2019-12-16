import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from 'modules/auth/selector';

function Auth(props: { children: JSX.Element }) {
  const isLoggingin = useSelector(getIsAuthenticated);
  return isLoggingin ? props.children : <Redirect to={'/login'} />;
}

export default Auth;

export function PrivateRoute({
  component: Component,
  ...rest
}: {
  component: React.ComponentType<RouteComponentProps>;
}) {
  const isLoggingin = useSelector(getIsAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isLoggingin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import CONSTS from 'consts';
import theme from 'components/themes';

function Dummy() {
  return <div>adsf</div>;
}

function Router() {
  return (
    <BrowserRouter>
      <>
        <Route path="/" component={Dummy} />
      </>
    </BrowserRouter>
  );
}

export default Router;

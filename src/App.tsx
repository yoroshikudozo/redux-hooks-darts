import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router';

import './App.css';

interface Props {
  store: Store;
}

function App({ store }: Props) {
  return (
    <Provider store={store}>
      <div>
        <Route path="/" component={() => <div>adsf</div>} />
      </div>
    </Provider>
  );
}

export default App;

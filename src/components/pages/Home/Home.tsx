import React from 'react';

import { Link } from 'react-router-dom';

import CONSTS from 'consts';

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to={CONSTS.ROUTES.USERS.ROOT}>Users</Link>
      <Link to={CONSTS.ROUTES.GAMES.ROOT}>Games</Link>
    </>
  );
}

export default Home;

import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CONSTS from 'consts';

import Players from 'components/molecules/Players';
import { getPlayers } from 'modules/users/selectors';

export default function Users() {
  const players = useSelector(getPlayers);

  return (
    <div>
      <h1>Users</h1>
      <Link to={CONSTS.ROUTES.HOME}>Home</Link>
      <Link to={CONSTS.ROUTES.USERS.CREATE}>New</Link>
      {players && <Players players={players} />}
    </div>
  );
}

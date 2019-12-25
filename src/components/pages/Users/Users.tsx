import React from 'react';
import { useSelector } from 'react-redux';

import { getPlayers } from 'modules/users/selectors';

import Players from 'components/molecules/Players';
import { Link } from 'react-router-dom';
import CONSTS from 'consts';
import { useFetchPlayers } from 'components/hooks/useFetchPlayers';

export default function Users() {
  const players = useSelector(getPlayers);

  const { loading } = useFetchPlayers();

  return (
    <div>
      <h1>Users</h1>
      <Link to={CONSTS.ROUTES.HOME}>Home</Link>
      <Link to={CONSTS.ROUTES.USERS.CREATE}>New</Link>
      {loading || <Players players={players} />}
    </div>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsersCancel } from 'modules/users/actions';
import { fetchUsers } from 'modules/users/asyncActions';
import { getPlayers } from 'modules/users/selectors';

import Players from 'components/molecules/Players';

export default function Users() {
  const dispatch = useDispatch();
  const players = useSelector(getPlayers);

  useEffect(() => {
    dispatch(fetchUsers());
    return () => {
      dispatch(fetchUsersCancel());
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Users</h1>
      <Players players={players} />
    </div>
  );
}

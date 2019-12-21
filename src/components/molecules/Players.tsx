import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPlayers } from 'modules/users/asyncActions';
import { fetchPlayersCancel } from 'modules/users/actions';
import { getPlayers } from 'modules/users/selectors';
import { User } from 'modules/users/types';

export default function Players() {
  const dispatch = useDispatch();
  const players = useSelector(getPlayers);

  useEffect(() => {
    dispatch(fetchPlayers());
    return () => {
      dispatch(fetchPlayersCancel());
    };
  }, [dispatch]);

  return (
    players && (
      <ul>
        {players.map((player: User, index: number) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
    )
  );
}

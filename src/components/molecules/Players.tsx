import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, fetchPlayersCancel } from 'modules/users/actions';
import { getPlayers } from 'modules/users/selectors';

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
      <>
        {players.map(player => (
          <>{player.name}</>
        ))}
      </>
    )
  );
}

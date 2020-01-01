import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { fetchPlayersAsync } from 'modules/users/actions';
import { fetchPlayersRequest2 } from 'modules/users/api';

export const useFetchPlayers = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      dispatch(fetchPlayersAsync.started());
      try {
        const result = await fetchPlayersRequest2(controller);
        dispatch(fetchPlayersAsync.done({ result }));
      } catch (error) {
        dispatch(fetchPlayersAsync.failed({ error }));
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return { loading };
};

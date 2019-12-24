import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchPlayersAsync } from 'modules/users/actions';
import { fetchPlayersRequest2 } from 'modules/users/api';

export const useFetchPlayers = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const controller = new AbortController();

  useEffect(() => {
    (async () => {
      setLoading(true);
      dispatch(fetchPlayersAsync.started());
      try {
        setLoading(false);
        const result = await fetchPlayersRequest2(controller);
        dispatch(fetchPlayersAsync.done({ result }));
      } catch (error) {
        setLoading(false);
        dispatch(fetchPlayersAsync.failed({ error }));
      }
    })();
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return { loading };
};

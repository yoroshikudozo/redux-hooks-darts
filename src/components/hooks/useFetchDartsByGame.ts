import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { FetchDartsByGameParams } from 'modules/darts/types';
import { fetchDartsByGameAsync } from 'modules/darts/actions';
import { fetchDartsByGameRequest2 } from 'modules/darts/api';

export const useFetchDartsByGame = (params: FetchDartsByGameParams) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const controller = new AbortController();

  useEffect(() => {
    (async () => {
      setLoading(true);
      dispatch(fetchDartsByGameAsync.started(params));
      try {
        setLoading(false);
        const result = await fetchDartsByGameRequest2(params, controller);
        dispatch(fetchDartsByGameAsync.done({ params, result }));
      } catch (error) {
        setLoading(false);
        dispatch(fetchDartsByGameAsync.failed({ params, error }));
      }
    })();
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return { loading };
};

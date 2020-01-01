import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { fetchDartsByGameAsync } from 'modules/darts/actions';
import { fetchDartsByGameRequest2 } from 'modules/darts/api';
import { FetchDartsByGameParams } from 'modules/darts/types';

export const useFetchDartsByGame = (params: FetchDartsByGameParams) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useCallback(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      dispatch(fetchDartsByGameAsync.started(params));
      try {
        const result = await fetchDartsByGameRequest2(params, controller);
        dispatch(fetchDartsByGameAsync.done({ params, result }));
      } catch (error) {
        dispatch(fetchDartsByGameAsync.failed({ params, error }));
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [dispatch, params]);

  return { loading };
};

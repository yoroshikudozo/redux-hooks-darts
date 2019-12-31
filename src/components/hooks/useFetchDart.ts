import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { fetchDartAsync } from 'modules/darts/actions';
import { fetchDartRequest2 } from 'modules/darts/api';
import { FetchDartParams } from 'modules/darts/types';

export const useFetchDart = (params: FetchDartParams) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const controller = new AbortController();

  useEffect(() => {
    (async () => {
      setLoading(true);
      dispatch(fetchDartAsync.started(params));
      try {
        setLoading(false);
        const result = await fetchDartRequest2(params, controller);
        dispatch(fetchDartAsync.done({ params, result }));
      } catch (error) {
        setLoading(false);
        dispatch(fetchDartAsync.failed({ params, error }));
      }
    })();
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return { loading };
};

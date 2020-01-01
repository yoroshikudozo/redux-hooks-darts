import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { fetchUserAsync } from 'modules/users/actions';
import { fetchUserRequest2 } from 'modules/users/api';
import { FetchUserParams } from 'modules/users/types';

export const useFetchUser = (params: FetchUserParams) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      dispatch(fetchUserAsync.started(params));
      try {
        const result = await fetchUserRequest2(params, controller);
        dispatch(fetchUserAsync.done({ params, result }));
      } catch (error) {
        dispatch(fetchUserAsync.failed({ params, error }));
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

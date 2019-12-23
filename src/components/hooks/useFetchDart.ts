import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Dart, FetchDartParams } from 'modules/darts/types';
import { fetchDartAsync } from 'modules/darts/actions';

import API from 'consts/endpoints';
import { dartsNormalize } from 'modules/darts/schemas';
import http, { handleErrors } from 'modules/common/utils/wretch';

export const useFetchDart = (params: FetchDartParams) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const controller = new AbortController();

  const getDart = useCallback(async () => {
    setLoading(true);
    dispatch(fetchDartAsync.started(params));
    try {
      setLoading(false);
      const result = await http(`${API.DARTS}/${params.id}`)
        .signal(controller)
        .get()
        .json<Dart>()
        .then(data => dartsNormalize<{ darts: string[] }>(data))
        .catch(handleErrors);
      dispatch(fetchDartAsync.done({ params, result }));
    } catch (error) {
      setLoading(false);
      dispatch(fetchDartAsync.failed({ params, error }));
    }
    return () => {
      controller.abort();
    };
  }, [params, dispatch, controller]);

  return { loading, getDart };
};

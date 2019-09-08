import axios, {
  AxiosResponse,
  CancelTokenSource,
  AxiosRequestConfig,
  Method,
  CancelToken,
} from 'axios';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { ThunkDispatch } from 'redux-thunk';

import API, { Endpoints } from 'consts/endpoints';
import { AppState } from 'modules/reducers';

type AsyncActionType = 'create' | 'read' | 'update' | 'delete';

interface InitArg<P> {
  endpoint?: string;
  method: Method;
  id: Endpoints;
  type: AsyncActionType;
  params: P;
}

interface SetConfigArgs<P> {
  method: Method;
  params: P;
  cancelToken: CancelToken;
}

export type Request = (
  dispatch: ThunkDispatch<AppState, undefined, AnyAction>,
) => CancelTokenSource;

export default function request() {
  const defaultConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  const asyncActions = <Params, Result, Error>(
    id: string,
    type: AsyncActionType,
  ) => {
    const actionCreator = actionCreatorFactory(id);
    return actionCreator.async<Params, Result, Error>(type.toUpperCase());
  };

  function setConfig<Params>({
    method,
    params,
    cancelToken,
  }: SetConfigArgs<Params>): AxiosRequestConfig {
    if (method === 'put' || 'post' || 'patch') {
      return {
        ...defaultConfig,
        data: params,
        method,
        cancelToken,
      };
    } else {
      return {
        ...defaultConfig,
        ...params,
        method,
      };
    }
  }

  function catchError(error: Error) {
    if (axios.isCancel(error)) {
      throw new Error(`Request cancelled: ${error.message}`);
    } else {
      throw new Error(`Error retrieving response: ${error.message}`);
    }
  }

  async function send(url: string, config: object = {}) {
    console.log({ ...config, url });
    return await axios({ ...config, url });
  }

  function init<Params, Result, Error>({
    id,
    method,
    type,
    params,
    endpoint,
  }: InitArg<Params>): Request {
    const actions = asyncActions<Params, Result, Error>(id, type);
    const url = endpoint || API[id];
    const canceller = axios.CancelToken.source();
    const requestConfig = setConfig<Params>({
      method,
      params,
      cancelToken: canceller.token,
    });

    return dispatch => {
      dispatch(actions.started(params));
      try {
        send(url, requestConfig)
          .then(({ data }: AxiosResponse<Result>) => {
            dispatch(actions.done({ params, result: data }));
          })
          .catch((error: Error) => {
            console.log(error);
            dispatch(actions.failed({ params, error }));
          });
      } catch (error) {
        console.log(error);
        catchError(error);
      }

      return canceller;
    };
  }

  function post<Params>(id: Endpoints, endpoint: string = '') {
    return (params: Params) =>
      init({ method: 'post', type: 'create', id, endpoint, params });
  }

  function get<Params>(id: Endpoints, endpoint: string = '') {
    return (params: Params) =>
      init({ method: 'get', type: 'read', id, endpoint, params });
  }

  function put<Params>(id: Endpoints, endpoint: string = '') {
    return (params: Params) =>
      init({ method: 'put', type: 'update', id, endpoint, params });
  }

  function del<Params>(id: Endpoints, endpoint: string = '') {
    return (params: Params) =>
      init({ method: 'delete', type: 'delete', id, endpoint, params });
  }

  return {
    post,
    get,
    put,
    delete: del,
  };
}

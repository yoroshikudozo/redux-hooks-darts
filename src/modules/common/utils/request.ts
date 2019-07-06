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
    if (method === 'PUT' || 'POST' || 'PATCH' || 'put' || 'post' || 'patch') {
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

  async function send(id: Endpoints, config: object = {}) {
    console.log({ url: `${API[id]}`, ...config });
    return await axios({ url: `${API[id]}`, ...config });
  }

  function init<Params, Result, Error>({
    id,
    method,
    type,
    params,
  }: InitArg<Params>) {
    const actions = asyncActions<Params, Result, Error>(id, type);
    const canceller = axios.CancelToken.source();
    const requestConfig = setConfig<Params>({
      method,
      params,
      cancelToken: canceller.token,
    });

    return (
      dispatch: ThunkDispatch<AppState, undefined, AnyAction>,
    ): CancelTokenSource => {
      dispatch(actions.started(params));
      try {
        send(id, requestConfig)
          .then((response: AxiosResponse<Result>) => {
            const result = response.data;
            dispatch(actions.done({ params, result }));
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

  function post<Params>(id: Endpoints) {
    return (params: Params) =>
      init({ method: 'post', type: 'create', id, params });
  }

  function get<Params>(id: Endpoints) {
    return (params: Params) =>
      init({ method: 'get', type: 'read', id, params });
  }

  function put<Params>(id: Endpoints) {
    return (params: Params) =>
      init({ method: 'put', type: 'update', id, params });
  }

  function del<Params>(id: Endpoints) {
    return (params: Params) =>
      init({ method: 'delete', type: 'delete', id, params });
  }

  return {
    post,
    get,
    put,
    delete: del,
  };
}

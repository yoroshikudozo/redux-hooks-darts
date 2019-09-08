import axios, {
  AxiosResponse,
  CancelTokenSource,
  AxiosRequestConfig,
  CancelToken,
  AxiosInstance,
  AxiosPromise,
} from 'axios';
import actionCreatorFactory, {
  AnyAction,
  ActionCreatorFactory,
  AsyncActionCreators,
} from 'typescript-fsa';
import { ThunkDispatch } from 'redux-thunk';
import { tryCatch, TaskEither } from 'fp-ts/lib/TaskEither';

import API, { Endpoints } from 'consts/endpoints';
import { AppState } from 'modules/reducers';
import { Dispatch } from 'redux';
import { Dart, DartsResponse } from 'modules/darts/types';
import compose from 'ramda/es/compose';
import curry from 'ramda/es/curry';
import assoc from 'ramda/es/assoc';
import R from 'ramda';

type AsyncActionType = 'create' | 'read' | 'update' | 'delete';
type Method = 'get' | 'post' | 'put' | 'delete';

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

interface SetConfigArgs2<P> {
  method: Method;
  params: P;
  // cancelToken: CancelToken;
}

const dartsActionCreator = actionCreatorFactory('darts');

const defaultConfig: AxiosRequestConfig = {
  baseURL: API.DARTS,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

interface FetchDartsParams {
  value: number;
}

interface FetchDartsResult {
  value: number;
}

const fetchDartsRequestOld = tryCatch<Error, DartsResponse>(
  () => new Promise(resolve => resolve(JSON.parse('{ "name": "Carol" }'))),
  reason => new Error(String(reason)),
);

function setConfigWithParams<Params>(params: Params): AxiosRequestConfig {
  return {
    data: params,
  };
}
function setConfigWithData<Params>(data: Params): AxiosRequestConfig {
  return {
    data,
  };
}

const setConfigWithParams2 = curry(
  (params: AxiosRequestConfig['params'], url: string): AxiosRequestConfig => {
    return {
      url,
      params,
    };
  },
);

const instance = axios.create(defaultConfig);

function create<T, P>(axios: AxiosInstance) {
  return curry((url: string, data: P) => axios.post<T>(url, data));
}
function read<T, P>(axios: AxiosInstance) {
  return curry((url: string, params: P) => axios.get<T>(url, params));
}
function update<T, P>(axios: AxiosInstance) {
  return curry((url: string, data: P) => axios.put<T>(url, data));
}
function del<T, P>(axios: AxiosInstance) {
  return curry((url: string, params: P) => axios.delete<T>(url, params));
}

function http(axios: AxiosInstance) {
  function create<T, P>() {
    return curry((url: string, data: P) => axios.post<T>(url, data));
  }
  function read<T, P>() {
    return curry((url: string, params: P) => axios.get<T>(url, params));
  }
  function update<T, P>() {
    return curry((url: string, data: P) => axios.put<T>(url, data));
  }
  function del<T, P>() {
    return curry((url: string, params: P) => axios.delete<T>(url, params));
  }

  return {
    create,
    read,
    update,
    delete: del,
  };
}

// const httpGet = <T, P>() => read<T, P>(instance);
// const httpCreate = <T, P>() => create<T, P>(instance);
// const httpUpdate = <T, P>() => update<T, P>(instance);
// const httpDelete = <T, P>() => del<T, P>(instance);

const request = http(instance);
const fetchDartsHttp = <T, R>() => request.read<T, R>()('/darts');
const fetchDartsRequest = fetchDartsHttp<DartsResponse, FetchDartsParams>();
const fetchDartRequest = fetchDartsHttp<Dart, { id: string }>();

// const fetchDartsHttpOld = (axios: AxiosInstance, params: FetchDartsParams) =>
//   axios.get<DartsResponse, Promise<DartsResponse>>(
//     '/darts',
//     setConfigWithParams(params),
//   );

// const fetchOld = compose<AxiosRequestConfig, Promise<DartsResponse>>(
//   axiosInstance.get,
//   setConfigWithParams,
// );

// function fetchDartsRequest<T>(params: FetchDartsParams) {
//   return httpGetDartsOld<T>(params);
// }

const fetchDartsTask = <FetchDartsParams, DartsResponse>(
  params: FetchDartsParams,
  actions: AsyncActionCreators<FetchDartsParams, DartsResponse>,
) =>
  tryCatch(
    () =>
      fetchDartsRequest(params).then(({ data }: DartsResponse) => {
        actions.done({ params, result: data });
      }),
    reason => new Error(String(reason)),
  );

const fetchDartsActions = dartsActionCreator.async<
  FetchDartsParams,
  FetchDartsResult,
  Error
>('FETCH');

const fetchDarts = (params: FetchDartsParams) => {
  fetchDartsTask(params);
};

export const dispatcher = (action: AnyAction) => (dispatch: Dispatch) =>
  dispatch(action);

function catchError(error: Error) {
  if (axios.isCancel(error)) {
    throw new Error(`Request cancelled: ${error.message}`);
  } else {
    throw new Error(`Error retrieving response: ${error.message}`);
  }
}

export const requestThunk = (
  dispatch: ThunkDispatch<AppState, undefined, AnyAction>,
) => (actions: AsyncActionCreators<Params, Result, Error>) => {
  dispatcher(actions.started(params));
  try {
    request_(requestConfig)
      .then(({ data }: AxiosResponse<Result>) => {
        dispatch(actions.done({ params, result: data }));
      })
      .catch((error: Error) => {
        dispatch(actions.failed({ params, error }));
      });
  } catch (error) {
    catchError(error);
  }

  return canceller;
};

export type Request = (
  dispatch: ThunkDispatch<AppState, undefined, AnyAction>,
) => CancelTokenSource;

export default function request_() {
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
            dispatch(actions.failed({ params, error }));
          });
      } catch (error) {
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

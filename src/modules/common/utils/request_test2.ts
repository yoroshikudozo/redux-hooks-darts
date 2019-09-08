import axios, {
  AxiosResponse,
  CancelTokenSource,
  AxiosRequestConfig,
  Method,
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
import { tryCatch } from 'fp-ts/lib/TaskEither';

import API, { Endpoints } from 'consts/endpoints';
import { AppState } from 'modules/reducers';
import { Dispatch } from 'redux';
import { Dart, DartsResponse } from 'modules/darts/types';
import curry from 'ramda/es/curry';
import compose from 'ramda/es/compose';
import props from 'ramda/es/props';
import prop from 'ramda/es/prop';

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

interface SetConfigArgs2<P> {
  method: Method;
  params: P;
  // cancelToken: CancelToken;
}

interface FetchDartsParams {
  value: number;
}

interface FetchDartsResult {
  darts: Dart[];
}

const Impure = {
  request: curry((http, config) => http(config)),
  trace: curry((tag, x) => {
    console.log(tag, x);
    return x;
  }),
};

type Url = (baseUrl: string) => (path: string) => string;
const url: Url = curry((baseUrl, path) => `${baseUrl}${path}`);

const getParams = (url: string, params: FetchDartsParams) => ({
  url,
  params,
});

const getDartsParams = (params: FetchDartsParams) => ({
  url: '/darts',
  params,
});

const fetchDartsRequest = (config: AxiosRequestConfig) =>
  axios.request<FetchDartsResult>(config);

const fetchDarts = compose(
  fetchDartsRequest,
  Impure.trace('after getDartsParams'),
  getDartsParams,
);

const fetchDarts2 = compose(
  fetchDartsRequest,
  Impure.trace('after getParams'),
  getParams,
);

console.log(fetchDarts({ value: 20 }));
console.log(fetchDarts2('/darts', { value: 20 }));

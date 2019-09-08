import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import actionCreatorFactory from 'typescript-fsa';
import { ThunkDispatch } from 'redux-thunk';
import { tryCatch } from 'fp-ts/lib/TaskEither';

import API from 'consts/endpoints';
import { AppState } from 'modules/reducers';
import { Dart } from 'modules/darts/types';

import R from 'ramda';
import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

type AsyncActionType = 'create' | 'read' | 'update' | 'delete';
type Method = 'get' | 'post' | 'put' | 'delete';

interface FetchDartsParams {
  value: number;
}

interface FetchDartsResponse {
  darts: Dart[];
}

const dartsActionCreator = actionCreatorFactory('DARTS');
const fetchDartsActions = dartsActionCreator.async<
  FetchDartsParams,
  FetchDartsResponse,
  Error
>('FETCH');

const defaultConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

export const addUrlToConfig = (
  url: string,
): ((config: AxiosRequestConfig) => AxiosRequestConfig) => R.assoc('url', url);
export const addMethodToConfig = (method: Method) => R.assoc('method', method);
export const addParamsToConfig = <P>(params: P) => R.assoc('params', params);

export const http = axios.create(defaultConfig);
export const request = http.request;

type FetchDartsRequest = (
  params: FetchDartsParams,
) => Promise<AxiosResponse<FetchDartsResponse>>;

export const fetchDartsRequest: FetchDartsRequest = R.compose(
  request,
  addUrlToConfig(API.DARTS),
  addMethodToConfig('get'),
  addParamsToConfig,
);

export const fetchDartsTask = (params: FetchDartsParams) =>
  tryCatch<Error, AxiosResponse<FetchDartsResponse>>(
    () => fetchDartsRequest(params),
    reason => new Error(String(reason)),
  );

// export const fetchDarts = (params: FetchDartsParams) => (
//   dispatch: ThunkDispatch<AppState, null, any>,
// ) => {
//   const task = fetchDartsTask(params);
//   dispatch(fetchDartsActions.started(params));
//   task().then(
//     pipe(
//       fold(
//         err => dispatch(fetchDartsActions.failed({ error: err, params })),
//         res => dispatch(fetchDartsActions.done({ result: res.data, params })),
//       ),
//     ),
//   );
// };

console.log(fetchDartsRequest);

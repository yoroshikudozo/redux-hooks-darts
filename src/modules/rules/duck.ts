import actionCreatorFactory, { AsyncActionCreators } from 'typescript-fsa';

import { DartsResponse, Dart } from 'modules/darts/types';
import { dartListSchema } from 'modules/darts/schema';
import {
  CallApiActionArgs,
  ModuleNames,
  RequestTypes,
} from 'modules/middlewares/api';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import callApi, { Method } from 'modules/common/mock/mock';
import { Schema, normalize, NormalizedSchema } from 'normalizr';

const actionCreator = actionCreatorFactory('DARTS');

export function callApiActionCreator<P, R, E>({
  requestType,
  name,
  endpoint = undefined,
  asyncActions,
  schema,
}: CallApiActionArgs<P, R, E>) {
  return function<P>(params: P) {
    return {
      type: 'CALL_API' as const,
      payload: params,
      meta: {
        name,
        requestType,
        endpoint,
        asyncActions,
        schema,
      },
    };
  };
}

// export const fetchDarts = callApiActionCreator<
//   { gameId: string },
//   DartsResponse,
//   string
// >({
//   requestType: 'fetch',
//   name: 'darts',
//   asyncActions: actionCreator.async('FETCH'),
//   schema: dartListSchema,
// });

const normalizer = <E, R>(result: R) => (schema: Schema) =>
  normalize<E, R>(result, schema);

export interface Test<P, R, E> {
  method: Method;
  name: ModuleNames;
  requestType: RequestTypes;
  endpoint?: string;
  schema: Schema;
  asyncAction: AsyncActionCreators<P, R, E>;
}

const callApiThunkFactory = <P, R, Entity, Err>({
  requestType,
  name,
  method,
  endpoint,
  asyncAction,
  schema,
}: Test<P, NormalizedSchema<Entity, R>, Err>) => (
  params: P,
): ThunkAction<
  Promise<NormalizedSchema<Entity, R>>,
  {},
  {},
  AnyAction
> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
): Promise<NormalizedSchema<Entity, R>> => {
  console.log(asyncAction.started(params));
  dispatch(asyncAction.started(params));
  const url = endpoint ? endpoint : name;
  const request = () => {
    switch (requestType) {
      case 'fetch':
        return callApi.get;
      case 'create':
        return callApi.post;
      case 'update':
        return callApi.put;
      case 'delete':
        return callApi.delete;
      default:
        return callApi.get;
    }
  };

  return request()<R>(url, params).then(
    result => {
      const normalizedData = normalizer<Entity, R>(result)(schema);
      console.log(asyncAction.done({ params, result: normalizedData }));
      dispatch(asyncAction.done({ params, result: normalizedData }));
      return normalizedData;
    },
    (error: Err) => {
      console.log(asyncAction.failed({ params, error }));
      dispatch(asyncAction.failed({ params, error }));
      throw error;
    },
  );
};

export const fetchDarts = callApiThunkFactory<
  { gameId: string },
  DartsResponse,
  Dart,
  {}
>({
  requestType: 'fetch',
  name: 'darts',
  method: 'GET',
  asyncAction: actionCreator.async('fetch'),
  schema: dartListSchema,
});

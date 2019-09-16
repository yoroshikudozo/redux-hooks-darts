import actionCreatorFactory from 'typescript-fsa';
import cuid from 'cuid';

import {
  Dart,
  FetchDartsParams,
  CreateDartData,
  CreateDartsParams,
} from 'modules/darts/types';
import { NormalizedSchema } from 'normalizr';
import { AppState } from 'modules/reducers';

const dartsActionCreator = actionCreatorFactory('DARTS');

export const fetchDartsASync = dartsActionCreator.async<
  FetchDartsParams,
  NormalizedSchema<{ [key: string]: Dart }, string[]>
>('FETCH');

export const createDartAsync = dartsActionCreator.async<
  CreateDartData,
  NormalizedSchema<{ [key: string]: Dart }, string[]>
>('CREATE');

export const createDart = dartsActionCreator<CreateDartsParams>('CREATE');

const actions = {
  fetchDartsASync,
  createDart,
  createDartAsync,
};

export const initCreateDartRequestData = (
  params: CreateDartsParams,
  state: AppState,
): CreateDartData => ({
  id: cuid(),
  area: 'inner',
  dartType: 'single',
  value: params.value,
  index: 1,
});

export default actions;

// const initDart = (data: CreateDartData, rule: any): CreateDartParams => {
//   return (data as unknown) as CreateDartParams;
// };

// export const fetchDarts = request().get<FetchDartsParams>('DARTS');

// export const createDart = (
//   data: CreateDartData,
// ): ThunkAction<CancelTokenSource, AppState, undefined, AnyAction> => (
//   dispatch,
//   getState,
// ) => {
//   const rule = getRules(getState());
//   const dart = initDart(data, rule);
//   return dispatch(request().post<CreateDartParams>('DARTS')(dart));
// };

// export const deleteDart = request().delete<DeleteDartParams>('DARTS');

// export const updateDart = (
//   id: string,
//   data: Partial<Dart>,
// ): ThunkAction<
//   CancelTokenSource,
//   AppState,
//   undefined,
//   AnyAction
// > => dispatch => {
//   return dispatch(
//     request().put<Partial<Dart>>('DARTS', `${API.DARTS}/${id}`)(data),
//   );
// };

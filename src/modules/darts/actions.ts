import actionCreatorFactory, { Action, AnyAction } from 'typescript-fsa';
import cuid from 'cuid';

import {
  Dart,
  FetchDartsParams,
  CreateDartData,
  CreateDartsParams,
} from 'modules/darts/types';
import { NormalizedSchema } from 'normalizr';
import { AppState } from 'modules/reducers';
import { ThunkAction } from 'redux-thunk';

const dartsActionCreator = actionCreatorFactory('DARTS');

export const fetchDartsAsync = dartsActionCreator.async<
  FetchDartsParams,
  NormalizedSchema<{ [key: string]: Dart }, string[]>
>('FETCH');

export const fetchDartsCancel = dartsActionCreator<FetchDartsParams>(
  'FETCH_CANCEL',
);

export const createDartAsync = dartsActionCreator.async<
  CreateDartData,
  NormalizedSchema<{ [key: string]: Dart }, string>
>('CREATE');

export const createDartAction = dartsActionCreator<number>('CREATE');
export const createDartCancel = dartsActionCreator<CreateDartData>(
  'CREATE_CANCEL',
);

export const initCreateDartRequestData = (
  value: number,
  state: AppState,
): CreateDartData => ({
  id: cuid(),
  area: 'inner',
  dartType: 'single',
  index: 1,
  value,
});

export const createDart = (
  value: number,
): ThunkAction<void, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const createDartData = initCreateDartRequestData(value, getState());
  dispatch(createDartAsync.started(createDartData));
};

const actions = {
  fetchDartsAsync,
  fetchDartsCancel,
  createDart,
  createDartAsync,
  createDartCancel,
};

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

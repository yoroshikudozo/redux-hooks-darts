import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import cuid from 'cuid';
import { ThunkAction } from 'redux-thunk';

import {
  FetchDartsParams,
  CreateDartData,
  FetchDartParams,
  Dart,
  FetchDartsByGameParams,
} from 'modules/darts/types';
import { AppState } from 'modules/reducers';
import { NormalizedEntities } from 'modules/common/schemas';

const dartsActionCreator = actionCreatorFactory('DARTS');

export const fetchDartsByGameAsync = dartsActionCreator.async<
  FetchDartsByGameParams,
  NormalizedEntities<Dart>,
  Error
>('LIST/FETCH');

export const fetchDartsByGameCancel = dartsActionCreator<
  FetchDartsByGameParams
>('LIST/FETCH_CANCEL');

export const fetchDartAsync = dartsActionCreator.async<
  FetchDartParams,
  NormalizedEntities<Dart>,
  Error
>('FETCH');

export const fetchDartCancel = dartsActionCreator<FetchDartParams>(
  'FETCH_CANCEL',
);

export const createDartAsync = dartsActionCreator.async<
  CreateDartData,
  NormalizedEntities<Dart>,
  Error
>('CREATE');

export const createDartAction = dartsActionCreator<number>('CREATE');
export const createDartCancel = dartsActionCreator<CreateDartData>(
  'CREATE_CANCEL',
);

export const initCreateDartRequestData = (
  id: string,
  value: number,
  state: AppState,
): CreateDartData => ({
  area: 'inner',
  dartType: 'single',
  id,
  index: 1,
  value,
});

export const fetchDart = (
  id: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(fetchDartAsync.started({ id }));
};

export const fetchDarts = (
  gameId: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(fetchDartsByGameAsync.started({ gameId }));
};

export const createDart = (
  value: number,
): ThunkAction<void, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const id = cuid();
  const createDartData = initCreateDartRequestData(id, value, getState());
  dispatch(createDartAsync.started(createDartData));
};

const actions = {
  fetchDarts,
  fetchDartsByGameAsync,
  fetchDartsByGameCancel,
  fetchDart,
  fetchDartAsync,
  fetchDartCancel,
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

import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import cuid from 'cuid';
import { ThunkAction } from 'redux-thunk';

import {
  FetchDartsParams,
  CreateDartData,
  FetchDartParams,
  NormalizedDarts,
} from 'modules/darts/types';
import { AppState } from 'modules/reducers';

const dartsActionCreator = actionCreatorFactory('DARTS');

export const fetchDartsAsync = dartsActionCreator.async<
  FetchDartsParams,
  NormalizedDarts,
  Error
>('LIST/FETCH');

export const fetchDartsCancel = dartsActionCreator<FetchDartsParams>(
  'LIST/FETCH_CANCEL',
);

export const fetchDartAsync = dartsActionCreator.async<
  FetchDartParams,
  NormalizedDarts,
  Error
>('FETCH');

export const fetchDartCancel = dartsActionCreator<FetchDartParams>(
  'FETCH_CANCEL',
);

export const createDartAsync = dartsActionCreator.async<
  CreateDartData,
  NormalizedDarts,
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
  id: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(fetchDartsAsync.started({ id }));
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
  fetchDartsAsync,
  fetchDartsCancel,
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

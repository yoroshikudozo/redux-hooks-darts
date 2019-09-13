import actionCreatorFactory, { AnyAction } from 'typescript-fsa';

import { Dart, FetchDartsParams } from 'modules/darts/types';
import { NormalizedSchema } from 'normalizr';

const dartsActionCreator = actionCreatorFactory('DARTS');

export const fetchDarts = dartsActionCreator.async<
  FetchDartsParams,
  NormalizedSchema<{ [key: string]: Dart }, string[]>
>('FETCH');

const actions = {
  fetchDarts,
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

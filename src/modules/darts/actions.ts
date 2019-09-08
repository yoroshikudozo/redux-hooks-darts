import { CancelTokenSource } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'typescript-fsa';

import request from 'modules/common/utils/request';
import { AppState } from 'modules/reducers';
import API from 'consts/endpoints';
import { getRules } from 'modules/rules/selectors';
import { Dart } from 'modules/darts/types';

interface FetchDartsParams {
  gameId: string;
}

interface CreateDartParams {
  point: string;
}

interface DeleteDartParams {
  id: string;
}

type CreateDartData = Partial<Dart>;

const initDart = (data: CreateDartData, rule: any): CreateDartParams => {
  return (data as unknown) as CreateDartParams;
};

export const fetchDarts = request().get<FetchDartsParams>('DARTS');

export const createDart = (
  data: CreateDartData,
): ThunkAction<CancelTokenSource, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const rule = getRules(getState());
  const dart = initDart(data, rule);
  return dispatch(request().post<CreateDartParams>('DARTS')(dart));
};

export const deleteDart = request().delete<DeleteDartParams>('DARTS');

export const updateDart = (
  id: string,
  data: Partial<Dart>,
): ThunkAction<
  CancelTokenSource,
  AppState,
  undefined,
  AnyAction
> => dispatch => {
  return dispatch(
    request().put<Partial<Dart>>('DARTS', `${API.DARTS}/${id}`)(data),
  );
};

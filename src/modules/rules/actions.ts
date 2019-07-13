import { CancelTokenSource } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'typescript-fsa';

import cuid from 'cuid';

import request from 'modules/common/utils/request';
import { AppState } from 'modules/reducers';
import API from 'consts/endpoints';
import { Rule } from 'modules/rules/types';

interface FetchRulesParams {
  userId: string;
}

interface DeleteRuleParams {
  id: string;
}

type CreateRuleData = Partial<Rule>;

export const fetchRules = request().get<FetchRulesParams>('RULES');

const initRule = (data: CreateRuleData, userId: string): Rule => {
  return {
    ...data,
    id: cuid(),
    userId,
    countUp: {
      bullSeparate: false,
      handicap: false,
      ...data.countUp,
    },
  };
};

export const createRule = (
  userId: string,
  data: Partial<Rule>,
): ThunkAction<
  CancelTokenSource,
  AppState,
  undefined,
  AnyAction
> => dispatch => {
  const rule = initRule(data, userId);
  return dispatch(request().post<Rule>('RULES')(rule));
};

export const deleteRule = request().delete<DeleteRuleParams>('DARTS');

export const updateRule = (
  id: string,
  data: Partial<Rule>,
): ThunkAction<
  CancelTokenSource,
  AppState,
  undefined,
  AnyAction
> => dispatch => {
  return dispatch(
    request().put<Partial<Rule>>('DARTS', `${API.DARTS}/${id}`)(data),
  );
};

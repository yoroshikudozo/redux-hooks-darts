import API from 'consts/endpoints';

import { CreateRuleData, FetchRuleParams, Rule } from 'modules/rules/types';

import http, { handleErrors } from 'modules/common/utils/wretch';

const endpoint = `${API.RULES}`;

export const fetchRuleRequest = ({ id }: FetchRuleParams) =>
  http(`${endpoint}/${id}`)
    .get()
    .json<Rule>()
    .catch(handleErrors);

export const createRuleRequest = (data: CreateRuleData) =>
  http(`${endpoint}`, {
    body: JSON.stringify(data),
  })
    .post()
    .json<Rule>()
    .catch(handleErrors);

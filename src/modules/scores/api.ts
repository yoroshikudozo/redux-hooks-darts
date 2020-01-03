import API from 'consts/endpoints';

import { scoresNormalize } from 'modules/scores/schemas';
import {
  CreateScoreData,
  FetchScoreParams,
  FetchScoresByGameParams,
  Score,
  ScoreList,
} from 'modules/scores/types';

import http, { handleErrors } from 'modules/common/utils/wretch';

const endpoint = `${API.ROOT}${API.SCORES}`;

export const fetchScoresByGameRequest = (
  { gameId }: FetchScoresByGameParams,
  controller: AbortController,
) =>
  http(`${endpoint}/games/${gameId}`)
    .signal(controller)
    .get()
    .json<ScoreList>()
    .catch(handleErrors)
    .then(data => scoresNormalize(data));

export const fetchScoreRequest = (
  { id }: FetchScoreParams,
  controller: AbortController,
) =>
  http(`${endpoint}/${id}`)
    .signal(controller)
    .get()
    .json<Score>()
    .catch(handleErrors)
    .then(data => scoresNormalize(data));

export const createScoreRequest = (data: CreateScoreData) =>
  http(`${endpoint}`, {
    body: JSON.stringify(data),
  })
    .post()
    .json<Score>()
    .catch(handleErrors);

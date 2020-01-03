import actionCreatorFactory from 'typescript-fsa';

import { NormalizedEntities } from 'modules/common/schemas';
import {
  CreateScoreData,
  FetchScoreParams,
  FetchScoresByGameParams,
  Score,
} from 'modules/scores/types';

const scoresActionCreator = actionCreatorFactory('SCORES');

export const fetchScoresByGameAsync = scoresActionCreator.async<
  FetchScoresByGameParams,
  NormalizedEntities<Score, { scores: string[] }>,
  Error
>('BY_GAME/FETCH');

export const fetchScoresByGameCancel = scoresActionCreator<
  FetchScoresByGameParams
>('BY_GAME/FETCH_CANCEL');

export const fetchScoreAsync = scoresActionCreator.async<
  FetchScoreParams,
  NormalizedEntities<Score, { scores: string[] }>,
  Error
>('FETCH');

export const fetchScoreCancel = scoresActionCreator<FetchScoreParams>(
  'FETCH_CANCEL',
);

export const createScoreAsync = scoresActionCreator.async<
  CreateScoreData,
  NormalizedEntities<Score, { scores: string[] }>,
  Error
>('CREATE');

export const createScoreCancel = scoresActionCreator<CreateScoreData>(
  'CREATE_CANCEL',
);

const actions = {
  fetchScoresByGameAsync,
  fetchScoresByGameCancel,
  fetchScoreAsync,
  fetchScoreCancel,
  createScoreAsync,
  createScoreCancel,
};

export default actions;

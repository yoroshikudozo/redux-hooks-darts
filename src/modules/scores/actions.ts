import actionCreatorFactory from 'typescript-fsa';

import { NormalizedScores } from 'modules/scores/schemas';
import {
  FetchScoreParams,
  FetchScoresByGameParams,
  Score,
} from 'modules/scores/types';

const scoresActionCreator = actionCreatorFactory('SCORES');

export const fetchScoresByGameAsync = scoresActionCreator.async<
  FetchScoresByGameParams,
  NormalizedScores,
  Error
>('BY_GAME/FETCH');

export const fetchScoresByGameCancel = scoresActionCreator<
  FetchScoresByGameParams
>('BY_GAME/FETCH_CANCEL');

export const fetchScoreAsync = scoresActionCreator.async<
  FetchScoreParams,
  NormalizedScores,
  Error
>('FETCH');

export const fetchScoreCancel = scoresActionCreator<FetchScoreParams>(
  'FETCH_CANCEL',
);

export const createScoreAsync = scoresActionCreator.async<
  Score,
  NormalizedScores,
  Error
>('CREATE');

export const createScoreCancel = scoresActionCreator<Score>('CREATE_CANCEL');

const actions = {
  fetchScoresByGameAsync,
  fetchScoresByGameCancel,
  fetchScoreAsync,
  fetchScoreCancel,
  createScoreAsync,
  createScoreCancel,
};

export default actions;

import * as R from 'ramda';

import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

import { AppState } from 'modules/reducers';

import { getEntities } from 'modules/common/selectors';
import { getRoundEntities } from 'modules/rounds/selectors';

const sortByRoundsLength = R.sortBy(score => score.rounds.length);

export const getGameIdFromScores = (_state_: AppState, gameId: string) =>
  gameId;

export const getScoreEntities = createSelector(
  getEntities,
  entities => entities.scores.byId,
);

export const getScoreAllIds = createSelector(
  getEntities,
  entities => entities.scores.allIds,
);

export const getScoreGameIds = createSelector(
  getEntities,
  entities => entities.scores.byGame,
);

export const getScoreIdsFromGameId = createCachedSelector(
  getScoreGameIds,
  getGameIdFromScores,
  (byGame, gameId) => byGame[gameId],
)((_state_, gameId) => gameId);

export const getScoreById = createCachedSelector(
  getScoreEntities,
  (_state_: AppState, id: string) => id,
  (byId, id) => byId[id],
)((_state_, id) => id);

export const getRoundIdsByScore = createCachedSelector(
  getScoreById,
  score => score.rounds,
)((_state_, id) => id);

export const getScoresByGameId = createCachedSelector(
  getScoreEntities,
  getScoreIdsFromGameId,
  (byId, scoreIds) => scoreIds.map(id => byId[id]),
)((_state_, gameId) => gameId);

export const getCurrentScore = createCachedSelector(
  getScoresByGameId,
  scores => sortByRoundsLength(scores)[0],
)((_state_, id) => id);

export const getCurrentRound = createCachedSelector(
  getCurrentScore,
  getRoundEntities,
  (scores, rounds) => {
    const currentRoundId = scores.rounds[scores.rounds.length - 1];
    console.log(currentRoundId);
    console.log(rounds);
    return rounds[currentRoundId];
  },
)((_state_, id) => id);

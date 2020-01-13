import cuid from 'cuid';

import { GameIdentifier } from 'config';

import { AppState } from 'modules/reducers';

import { getCurrentRoundId } from 'logics/countUp/selectors';
import { Dart, DartsBoardData } from 'modules/darts/types';
import { CreateGameData } from 'modules/games/types';
import { Round } from 'modules/rounds/types';
import { ScoreEntity } from 'modules/scores/types';
import { getPlayerIds } from 'modules/users/selectors';

export function makeCountUpGame({
  game,
  slug,
  state,
}: {
  game: GameIdentifier;
  slug: string;
  state: AppState;
}): CreateGameData {
  const id = cuid();
  const playerIds = getPlayerIds(state);
  return {
    date: Date.now().toString(),
    gameType: game,
    id,
    url: slug,
    status: 'playing',
    players: playerIds,
    round: 1,
    player: playerIds[0],
    rule: {
      bullSeparate: false,
    },
    scores: playerIds.map((playerId, index) => {
      if (index) return makeScore(id, playerId);
      return makeScore(id, playerId, true);
    }),
  };
}

export const makeScore = (
  gameId: string,
  playerId: string,
  isFirst = false,
): ScoreEntity => {
  const id = cuid();
  return {
    id,
    gameId,
    playerId,
    rounds: isFirst ? [makeRound(id, 0)] : [],
    summary: 0,
  };
};

export const makeRound = (scoreId: string, index: number): Round => {
  return {
    id: cuid(),
    darts: [],
    round: index + 1,
    scoreId,
    summary: 0,
  };
};

export const makeCountUpDart = (
  { area, value, type }: DartsBoardData,
  state: AppState,
): Dart => {
  const roundId = getCurrentRoundId(state);
  return {
    area: area,
    dartType: type,
    id: cuid(),
    roundId,
    index: 1,
    value,
    isValid: false,
    point: value,
  };
};

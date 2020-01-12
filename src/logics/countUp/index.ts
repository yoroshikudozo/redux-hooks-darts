import cuid from 'cuid';

import { GameIdentifier } from 'config';

import { AppState } from 'modules/reducers';

import { CreateGameData } from 'modules/games/types';
import { Round } from 'modules/rounds/types';
import { ScoreEntity } from 'modules/scores/types';
import { getPlayerIds } from 'modules/users/selectors';

export function makeCountUpGame({
  id,
  game,
  slug,
  state,
}: {
  id: string;
  game: GameIdentifier;
  slug: string;
  state: AppState;
}): CreateGameData {
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
    rounds: isFirst ? [makeRound(id)] : [],
    summary: 0,
  };
};

export const makeRound = (scoreId: string): Round => {
  const id = cuid();
  return {
    id,
    darts: [],
    round: 1,
    scoreId,
    summary: 0,
  };
};

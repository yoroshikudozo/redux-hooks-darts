import cuid from 'cuid';

import { GameIdentifier } from 'config';

import { AppState } from 'modules/reducers';

import { CreateGameData } from 'modules/games/types';
import { Round } from 'modules/rounds/types';
import { ScoreEntity } from 'modules/scores/types';

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
  console.log('initCountUpGame');
  return {
    date: Date.now().toString(),
    gameType: game,
    id,
    url: slug,
    status: 'playing',
    players: ['2', '1'],
    round: 1,
    player: '2',
    rule: {
      bullSeparate: false,
    },
    scores: ['2', '1'].map(playerId => makeScore(id, playerId)),
  };
}

export const makeScore = (gameId: string, playerId: string): ScoreEntity => {
  const id = cuid();
  return {
    id,
    gameId,
    playerId,
    rounds: [makeRound(id)],
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

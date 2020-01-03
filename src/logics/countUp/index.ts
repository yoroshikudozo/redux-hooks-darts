import cuid from 'cuid';

import { GameIdentifier } from 'config';

import { AppState } from 'modules/reducers';

import { CreateGameData } from 'modules/games/types';
import { Score } from 'modules/scores/types';

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

export const makeScore = (gameId: string, playerId: string): Score => ({
  id: cuid(),
  gameId,
  playerId,
  rounds: [],
  summary: 0,
});

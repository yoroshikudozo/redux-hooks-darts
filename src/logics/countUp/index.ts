import { GameIdentifier } from 'config';

import { AppState } from 'modules/reducers';

import { CreateGameData } from 'modules/games/types';

export function initCountUpGame({
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
  };
}

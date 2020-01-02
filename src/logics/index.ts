import { GameIdentifier } from 'config';

import { AppState } from 'modules/reducers';

import { CreateGameData } from 'modules/games/types';

export const initCreateGameData = ({
  id,
  game,
  slug,
  state,
}: {
  id: string;
  game: GameIdentifier;
  slug: string;
  state: AppState;
}): CreateGameData => {
  switch (game) {
    case 'countUp': {
      return {
        gameType: game,
        id,
        url: slug,
        status: 'playing',
        players: ['1'],
      };
    }
    default: {
      return {
        gameType: game,
        id,
        url: slug,
        status: 'playing',
        players: ['1'],
      };
    }
  }
};

import { GameIdentifier } from 'config';

import { initCountUpGame } from 'logics/countUp';
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
      return initCountUpGame({
        id,
        game,
        slug,
        state,
      });
    }
    default: {
      return {
        gameType: game,
        id,
        url: slug,
        status: 'playing',
        players: ['1', '2'],
        player: '2',
        round: 1,
        rule: {
          bullSeparate: false,
        },
      };
    }
  }
};

const createScoreData = ({
  id,
  game,
  slug,
  state,
}: {
  id: string;
  game: GameIdentifier;
  slug: string;
  state: AppState;
}) => {
  console.log('createScoreData');
};

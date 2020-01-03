import { GameIdentifier } from 'config';

import { makeCountUpGame } from 'logics/countUp';
import { AppState } from 'modules/reducers';

import { CreateGameData } from 'modules/games/types';

import score1 from 'modules/scores/mock/resources/score1';
import score2 from 'modules/scores/mock/resources/score2';

export const makeCreateGameData = ({
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
      return makeCountUpGame({
        id,
        game,
        slug,
        state,
      });
    }
    default: {
      return {
        date: Date.now().toString(),
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
        scores: [score1, score2],
      };
    }
  }
};

import { GameIdentifier } from 'config';

import { makeCountUpDart, makeCountUpGame } from 'logics/countUp';
import { AppState } from 'modules/reducers';

import { Dart, DartsBoardData } from 'modules/darts/types';
import { CreateGameData } from 'modules/games/types';

import score1 from 'modules/scores/mock/resources/score1';
import score2 from 'modules/scores/mock/resources/score2';

export const makeCreateGameData = ({
  game,
  slug,
  state,
}: {
  game: GameIdentifier;
  slug: string;
  state: AppState;
}): CreateGameData => {
  switch (game) {
    case 'countUp': {
      return makeCountUpGame({ game, slug, state });
    }
    default: {
      return {
        date: Date.now().toString(),
        gameType: game,
        id: '1',
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

export const makeDart = (data: DartsBoardData, state: AppState): Dart =>
  makeCountUpDart(data, state);

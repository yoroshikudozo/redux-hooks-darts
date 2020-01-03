import { makeCountUpGame, makeScore } from 'logics/countUp';
import { AppState } from 'modules/reducers';

import { CreateGameData } from 'modules/games/types';

import score1 from 'modules/scores/mock/resources/score1';
import score2 from 'modules/scores/mock/resources/score2';
import user1 from 'modules/users/mock/resources/user1';
import user2 from 'modules/users/mock/resources/user2';

describe('makeCountUpGame', () => {
  it('returns data correctly', () => {
    const state: AppState = ({
      entities: {
        users: {
          byId: { 1: user1, 2: user2 },
          allIds: ['1', '2'],
        },
      },
    } as unknown) as AppState;

    const data = makeCountUpGame({
      id: '1',
      game: 'countUp',
      slug: 'slug',
      state,
    });

    const result: CreateGameData = {
      id: '1',
      status: 'playing',
      gameType: 'countUp',
      url: 'slug',
      players: ['2', '1'],
      player: '2',
      round: 1,
      rule: {
        bullSeparate: false,
      },
      scores: [makeScore('1', '2'), makeScore('1', '1')],
    };

    expect(data).toEqual(result);
  });
});

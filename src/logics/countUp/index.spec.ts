import { initCountUpGame } from 'logics/countUp';
import { AppState } from 'modules/reducers';

import { CreateGameData } from 'modules/games/types';

import user1 from 'modules/users/mock/resources/user1';
import user2 from 'modules/users/mock/resources/user2';

describe('initCountUpGame', () => {
  it('returns data correctly', () => {
    const state: AppState = ({
      entities: {
        users: {
          byId: { 1: user1, 2: user2 },
          allIds: ['1', '2'],
        },
      },
    } as unknown) as AppState;

    const data = initCountUpGame({
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
    };

    expect(data).toEqual(result);
  });
});

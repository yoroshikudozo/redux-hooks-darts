import { makeCountUpGame, makeScore } from 'logics/countUp';
import { AppState } from 'modules/reducers';

import { CreateGameData } from 'modules/games/types';

import user1 from 'modules/users/mock/resources/user1';
import user2 from 'modules/users/mock/resources/user2';

const RealDate = Date;

beforeAll(() => {
  global.Date.now = jest.fn(() => new Date('2020-01-01T00:00:00Z').getTime());
});

afterAll(() => {
  global.Date = RealDate;
});

jest.mock('cuid', () => {
  const counter = 0;
  function id() {
    return counter + 1;
  }
  return id;
});

describe('makeCountUpGame', () => {
  it('returns data correctly', () => {
    const state: AppState = ({
      entities: {
        users: {
          byId: { 1: user1, 2: user2 },
          allIds: ['1', '2'],
          playerIds: ['2', '1'],
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
      date: Date.now().toString(),
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
      scores: [makeScore('1', '2', true), makeScore('1', '1')],
    };

    expect(data).toEqual(result);
  });
});

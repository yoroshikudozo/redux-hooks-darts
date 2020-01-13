import { makeCountUpGame, makeRound, makeScore } from 'logics/countUp';
import { AppState } from 'modules/reducers';

import { CreateGameData } from 'modules/games/types';
import { Round } from 'modules/rounds/types';
import { Score, ScoreEntity } from 'modules/scores/types';

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
    return (counter + 1).toString();
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

  describe('makeRound', () => {
    it('returns data correctly', () => {
      const data = makeRound('1', 0);

      const result: Round = {
        id: '1',
        darts: [],
        round: 1,
        scoreId: '1',
        summary: 0,
      };

      expect(data).toEqual(result);
    });
  });

  describe('makeScore', () => {
    it('returns data correctly', () => {
      const data = makeScore('1', '1');

      const result: Score = {
        id: '1',
        gameId: '1',
        playerId: '1',
        rounds: [],
        summary: 0,
      };

      expect(data).toEqual(result);
    });

    it('returns data with round correctly', () => {
      const data = makeScore('1', '1', true);

      const round: Round = {
        id: '1',
        darts: [],
        round: 1,
        scoreId: '1',
        summary: 0,
      };

      const result: ScoreEntity = {
        id: '1',
        gameId: '1',
        playerId: '1',
        rounds: [round],
        summary: 0,
      };

      expect(data).toEqual(result);
    });
  });
});

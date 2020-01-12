import { AppState } from 'modules/reducers';

import * as selectors from 'modules/scores/selectors';

import round1 from 'modules/rounds/mock/resources/round1';
import round2 from 'modules/rounds/mock/resources/round2';
import round3 from 'modules/rounds/mock/resources/round3';

import score1 from '../mock/resources/score1';
import score2 from '../mock/resources/score2';
import score3 from '../mock/resources/score3';

describe('scores selectors', () => {
  const state = {
    entities: {
      scores: {
        byId: {
          1: { ...score1, rounds: ['1', '2', '3', '4'] },
          2: { ...score2, rounds: ['4', '5', '6'] },
          3: { ...score3, rounds: ['7', '8', '9'] },
        },
        allIds: ['1', '2', '3'],
        byGame: {
          1: ['1', '2', '3'],
        },
      },
      rounds: {
        byId: {
          4: round1,
          5: round2,
          6: round3,
        },
        allIds: ['4', '5', '6'],
      },
    },
  };

  it('getScoreEntities selects collectly', async () => {
    expect(selectors.getScoreEntities((state as unknown) as AppState)).toEqual(
      state.entities.scores.byId,
    );
  });

  it('getScoreAllIds selects collectly', async () => {
    expect(selectors.getScoreAllIds((state as unknown) as AppState)).toEqual(
      state.entities.scores.allIds,
    );
  });

  it('getScoreGameIds selects collectly', async () => {
    expect(selectors.getScoreGameIds((state as unknown) as AppState)).toEqual(
      state.entities.scores.byGame,
    );
  });

  it('getScoreById selects collectly', async () => {
    expect(
      selectors.getScoreById((state as unknown) as AppState, '1'),
    ).toEqual({ ...score1, rounds: ['1', '2', '3', '4'] });
  });

  it('getScoreById has same refference', async () => {
    const data = selectors.getScoreById((state as unknown) as AppState, '1');
    const data2 = selectors.getScoreById((state as unknown) as AppState, '1');
    expect(data).toBe(data2);
  });

  describe('getScoreIdsFromGameId', () => {
    it('selects collectly', async () => {
      expect(
        selectors.getScoreIdsFromGameId((state as unknown) as AppState, '1'),
      ).toEqual(['1', '2', '3']);
    });

    it('has same refference', async () => {
      const data = selectors.getScoreIdsFromGameId(
        (state as unknown) as AppState,
        '1',
      );
      const data2 = selectors.getScoreIdsFromGameId(
        (state as unknown) as AppState,
        '1',
      );
      expect(data).toBe(data2);
    });
  });

  describe('getScoresByGameId', () => {
    it('selects collectly', async () => {
      expect(
        selectors.getScoresByGameId((state as unknown) as AppState, '1'),
      ).toEqual([
        { ...score1, rounds: ['1', '2', '3', '4'] },
        { ...score2, rounds: ['4', '5', '6'] },
        { ...score3, rounds: ['7', '8', '9'] },
      ]);
    });

    it('has same refference', async () => {
      const data = selectors.getScoresByGameId(
        (state as unknown) as AppState,
        '1',
      );
      const data2 = selectors.getScoresByGameId(
        (state as unknown) as AppState,
        '1',
      );
      expect(data).toBe(data2);
    });
  });

  describe('getCurrentScore', () => {
    it('selects collectly', async () => {
      expect(
        selectors.getCurrentScore((state as unknown) as AppState, '1'),
      ).toEqual({ ...score2, rounds: ['4', '5', '6'] });
    });

    it('has same refference', async () => {
      const data = selectors.getCurrentScore(
        (state as unknown) as AppState,
        '1',
      );
      const data2 = selectors.getCurrentScore(
        (state as unknown) as AppState,
        '1',
      );
      expect(data).toBe(data2);
    });
  });

  describe('getCurrentRound', () => {
    it('selects collectly', async () => {
      expect(
        selectors.getCurrentRound((state as unknown) as AppState, '1'),
      ).toEqual(round3);
    });

    it('has same refference', async () => {
      const data = selectors.getCurrentRound(
        (state as unknown) as AppState,
        '1',
      );
      const data2 = selectors.getCurrentRound(
        (state as unknown) as AppState,
        '1',
      );
      expect(data).toBe(data2);
    });
  });
});

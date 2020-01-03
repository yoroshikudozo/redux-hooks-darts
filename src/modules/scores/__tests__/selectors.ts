import { AppState } from 'modules/reducers';

import * as selectors from 'modules/scores/selectors';

import score1 from '../mock/resources/score1';
import score2 from '../mock/resources/score2';
import score3 from '../mock/resources/score3';

describe('scores selectors', () => {
  const state = {
    entities: {
      scores: {
        byId: { 1: score1, 2: score2, 3: score3 },
        allIds: ['1', '2', '3'],
        byGame: {
          1: ['1', '2'],
        },
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
    expect(selectors.getScoreById((state as unknown) as AppState, '1')).toEqual(
      score1,
    );
  });

  it('getScoreById has same refference', async () => {
    const data = selectors.getScoreById((state as unknown) as AppState, '1');
    const data2 = selectors.getScoreById((state as unknown) as AppState, '1');
    expect(data).toBe(data2);
  });

  it('getScoreIdsFromGameId selects collectly', async () => {
    expect(
      selectors.getScoreIdsFromGameId((state as unknown) as AppState, '1'),
    ).toEqual(['1', '2']);
  });

  it('getScoresByGameId selects collectly', async () => {
    expect(
      selectors.getScoresByGameId((state as unknown) as AppState, '1'),
    ).toEqual([score1, score2]);
  });
});

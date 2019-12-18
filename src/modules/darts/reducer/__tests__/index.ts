import entities from 'modules/darts/reducer/entities';
import games from 'modules/darts/reducer/games';
import { fetchDartsByGameAsync } from 'modules/darts/actions';
import { dartsNormalize } from 'modules/darts/schemas';

import dart1 from 'modules/darts/mock/resources/dart1';

describe('dartsReducer', () => {
  describe('entities', () => {
    it('should return the initial state', async () => {
      expect(entities(undefined, { type: '' })).toEqual({});
    });

    it('should handle fetchDartsAsync.done', async () => {
      const action = fetchDartsByGameAsync.done({
        params: { gameId: '1' },
        result: dartsNormalize(dart1),
      });
      expect(entities({}, action)).toEqual({
        entities: { darts: { 1: dart1 } },
      });
    });
  });

  describe('result', () => {
    it('should return the initial state', async () => {
      expect(games(undefined, { type: '' })).toEqual([]);
    });

    it('should handle fetchDartsAsync.done', async () => {
      console.log(dartsNormalize({ darts: [dart1] }));
      const action = fetchDartsByGameAsync.done({
        params: { gameId: '1' },
        result: dartsNormalize({ darts: [dart1] }),
      });
      expect(games([], action)).toEqual(['1']);
    });
  });
});

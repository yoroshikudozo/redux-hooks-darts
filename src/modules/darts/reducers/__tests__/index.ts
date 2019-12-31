import { fetchDartsByGameAsync } from 'modules/darts/actions';
import { dartsNormalize } from 'modules/darts/schemas';

import allIds from 'modules/darts/reducers/allIds';
import entities from 'modules/darts/reducers/byId';
import games from 'modules/darts/reducers/games';

import dart1 from 'modules/darts/mock/resources/dart1';

describe('dartsReducer', () => {
  describe('entities', () => {
    it('should return the initial state', async () => {
      expect(entities(undefined, { type: '' })).toEqual({});
    });

    it('should handle fetchDartsAsync.done', async () => {
      const action = fetchDartsByGameAsync.done({
        params: { gameId: '1' },
        result: dartsNormalize({ darts: [dart1] }),
      });
      expect(entities({}, action)).toEqual({ 1: dart1 });
    });
  });

  describe('allIds', () => {
    it('should return the initial state', async () => {
      expect(allIds(undefined, { type: '' })).toEqual([]);
    });

    it('should handle fetchDartsAsync.done', async () => {
      console.log(dartsNormalize({ darts: [dart1] }).result);
      const action = fetchDartsByGameAsync.done({
        params: { gameId: '1' },
        result: dartsNormalize({ darts: [dart1] }),
      });
      expect(allIds([], action)).toEqual(['1']);
    });
  });

  describe('byGame', () => {
    it('should return the initial state', async () => {
      expect(games(undefined, { type: '' })).toEqual({});
    });

    it('should handle fetchDartsAsync.done', async () => {
      const action = fetchDartsByGameAsync.done({
        params: { gameId: '1' },
        result: dartsNormalize({ darts: [dart1] }),
      });
      expect(games({}, action)).toEqual({ 1: ['1'] });
    });
  });
});

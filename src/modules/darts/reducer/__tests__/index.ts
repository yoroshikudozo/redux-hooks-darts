import byId from 'modules/darts/reducer/byId';
import allIds from 'modules/darts/reducer/allIds';
import { fetchDartsAsync } from 'modules/darts/actions';
import { dartsNormalize } from 'modules/darts/schemas';

import dart1 from 'modules/darts/mock/resources/dart1';

describe('dartsReducer', () => {
  describe('byId', () => {
    it('should return the initial state', async () => {
      expect(byId(undefined, { type: '' })).toEqual({ entities: {} });
    });

    it('should handle fetchDartsAsync.done', async () => {
      const action = fetchDartsAsync.done({
        params: { id: '1' },
        result: dartsNormalize({ darts: [dart1] }),
      });
      expect(byId({ entities: {} }, action)).toEqual({
        entities: { darts: { 1: dart1 } },
      });
    });
  });

  describe('allIds', () => {
    it('should return the initial state', async () => {
      expect(allIds(undefined, { type: '' })).toEqual({ result: [] });
    });

    it('should handle fetchDartsAsync.done', async () => {
      const action = fetchDartsAsync.done({
        params: { id: '1' },
        result: dartsNormalize({ darts: [dart1] }),
      });
      expect(allIds({ result: [] }, action)).toEqual({ result: ['1'] });
    });
  });
});

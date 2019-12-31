import { fetchRuleAsync } from 'modules/rules/actions';
import { rulesNormalize } from 'modules/rules/schemas';

import allIds from 'modules/rules/reducers/allIds';
import entities from 'modules/rules/reducers/byId';
import users from 'modules/rules/reducers/users';

import rule1 from 'modules/rules/mock/resources/rule1';

describe('rulesReducer', () => {
  describe('entities', () => {
    it('should return the initial state', async () => {
      expect(entities(undefined, { type: '' })).toEqual({});
    });

    it('should handle fetchRulesAsync.done', async () => {
      const action = fetchRuleAsync.done({
        params: { id: '1' },
        result: rulesNormalize({ rules: [rule1] }),
      });
      expect(entities({}, action)).toEqual({ 1: rule1 });
    });
  });

  describe('allIds', () => {
    it('should return the initial state', async () => {
      expect(allIds(undefined, { type: '' })).toEqual([]);
    });

    it('should handle fetchRulesAsync.done', async () => {
      const action = fetchRuleAsync.done({
        params: { id: '1' },
        result: rulesNormalize({ rules: [rule1] }),
      });
      expect(allIds([], action)).toEqual(['1']);
    });
  });

  describe('byGame', () => {
    it('should return the initial state', async () => {
      expect(users(undefined, { type: '' })).toEqual({});
    });

    it('should handle fetchRulesAsync.done', async () => {
      const action = fetchRuleAsync.done({
        params: { id: '1' },
        result: rulesNormalize({ rules: [rule1] }),
      });
      expect(users({}, action)).toEqual({ 1: ['1'] });
    });
  });
});

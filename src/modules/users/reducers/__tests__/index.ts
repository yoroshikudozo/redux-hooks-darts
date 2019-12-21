import entities from 'modules/users/reducers/byId';
import { fetchUserAsync } from 'modules/users/actions';
import { usersNormalize } from 'modules/users/schemas';

import user1 from 'modules/users/mock/resources/user1';
import allIds from 'modules/users/reducers/allIds';

describe('usersReducer', () => {
  describe('entities', () => {
    it('should return the initial state', async () => {
      expect(entities(undefined, { type: '' })).toEqual({});
    });

    it('should handle fetchUsersAsync.done', async () => {
      const action = fetchUserAsync.done({
        params: { id: '1' },
        result: usersNormalize({ users: [user1] }),
      });
      expect(entities({}, action)).toEqual({ 1: user1 });
    });
  });

  describe('allIds', () => {
    it('should return the initial state', async () => {
      expect(allIds(undefined, { type: '' })).toEqual([]);
    });

    it('should handle fetchUsersAsync.done', async () => {
      const action = fetchUserAsync.done({
        params: { id: '1' },
        result: usersNormalize({ users: [user1] }),
      });
      expect(allIds([], action)).toEqual(['1']);
    });
  });
});

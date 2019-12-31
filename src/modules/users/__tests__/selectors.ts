import { AppState } from 'modules/reducers';

import * as selectors from 'modules/users/selectors';

import user1 from '../mock/resources/user1';
import user2 from '../mock/resources/user2';
import user3 from '../mock/resources/user3';

describe('users selectors', () => {
  const state = {
    entities: {
      users: {
        byId: { 1: user1, 2: user2, 3: user3 },
        allIds: ['1', '2', '3'],
        byGame: {
          1: ['1', '2'],
        },
      },
    },
  };

  it('getUserEntities selects collectly', async () => {
    expect(selectors.getUserEntities((state as unknown) as AppState)).toEqual(
      state.entities.users.byId,
    );
  });

  it('getUserAllIds selects collectly', async () => {
    expect(selectors.getUserAllIds((state as unknown) as AppState)).toEqual(
      state.entities.users.allIds,
    );
  });

  it('getUserById selects collectly', async () => {
    expect(selectors.getUserById((state as unknown) as AppState, '1')).toEqual(
      user1,
    );
  });

  it('getUserById has same refference', async () => {
    const data = selectors.getUserById((state as unknown) as AppState, '1');
    const data2 = selectors.getUserById((state as unknown) as AppState, '1');
    expect(data).toBe(data2);
  });
});

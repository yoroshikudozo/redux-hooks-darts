import * as selectors from 'modules/darts/selectors';

import dart1 from '../mock/resources/dart1';
import dart2 from '../mock/resources/dart2';
import dart3 from '../mock/resources/dart3';
import { AppState } from 'modules/reducers';

describe('darts selectors', () => {
  const state = {
    entities: {
      darts: {
        byId: { 1: dart1, 2: dart2, 3: dart3 },
        allIds: ['1', '2', '3'],
        byGame: {
          1: ['1', '2'],
        },
      },
    },
  };

  it('getDartEntities selects collectly', async () => {
    expect(selectors.getDartEntities((state as unknown) as AppState)).toEqual(
      state.entities.darts.byId,
    );
  });

  it('getDartAllIds selects collectly', async () => {
    expect(selectors.getDartAllIds((state as unknown) as AppState)).toEqual(
      state.entities.darts.allIds,
    );
  });

  it('getDartGameIds selects collectly', async () => {
    expect(selectors.getDartGameIds((state as unknown) as AppState)).toEqual(
      state.entities.darts.byGame,
    );
  });

  it('getDartById selects collectly', async () => {
    expect(selectors.getDartById((state as unknown) as AppState, '1')).toEqual(
      dart1,
    );
  });

  it('getDartIdsFromGameId selects collectly', async () => {
    expect(
      selectors.getDartIdsFromGameId((state as unknown) as AppState, '1'),
    ).toEqual(['1', '2']);
  });

  it('getDartsByGameId selects collectly', async () => {
    expect(
      selectors.getDartsByGameId((state as unknown) as AppState, '1'),
    ).toEqual([dart1, dart2]);
  });
});

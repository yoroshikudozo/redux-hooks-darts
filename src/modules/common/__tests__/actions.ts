import { createEntityActions } from '../actions';

describe('ActionCreatorFactory', () => {
  it('returns actions', () => {
    const args = {
      fetch: {
        started: undefined,
        done: {
          params: { gameId: 'asdf' },
          result: { darts: [{ id: 1, score: 20 }, { id: 2, score: 20 }, { id: 3, score: 20 }] },
        },
        failed: {},
      },
      create: {
        started: undefined,
        done: {},
        failed: {},
      },
      update: {
        started: undefined,
        done: {},
        failed: {},
      },
      delete: {
        started: undefined,
        done: {},
        failed: {},
      },
    };

    const actions = createEntityActions('darts');

    console.log(actions.fetch.done(args.fetch.done));

    expect(actions.fetch.started(args.fetch.started)).toEqual({
      type: 'DARTS/FETCH_STARTED',
    });
  });
});

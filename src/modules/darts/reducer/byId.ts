import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actions from 'modules/darts/actions';
import { Dart } from 'modules/darts/types';
import { ById } from 'modules/common/types';

const initialState: ById<Dart> = { entities: {} };

export const byId = reducerWithInitialState(initialState).case(
  actions.fetchDartsASync.done,
  (state, action) => ({
    entities: {
      ...action.result.entities,
      ...state.entities,
    },
  }),
);

export default byId;

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actions from 'modules/darts/actions';
import { Dart } from 'modules/darts/types';
import { ById } from 'modules/common/types';

const initialState: ById<Dart> = {};

const byId = reducerWithInitialState(initialState).case(
  actions.fetchDartsByGameAsync.done,
  (state, action) => ({
    ...state,
    ...action.result.entities.darts,
  }),
);

export default byId;

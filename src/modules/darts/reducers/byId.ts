import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ById } from 'modules/common/types';
import actions from 'modules/darts/actions';
import { Dart } from 'modules/darts/types';

const initialState: ById<Dart> = {};

const byId = reducerWithInitialState(initialState)
  .case(actions.fetchDartsByGameAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.darts,
  }))
  .case(actions.fetchDartAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.darts,
  }));

export default byId;

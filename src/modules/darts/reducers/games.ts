import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/darts/actions';

const initialState: { [key: string]: string[] } = {};

const games = reducerWithInitialState(initialState).case(
  actions.fetchDartsByGameAsync.done,
  (state, action) => ({
    ...state,
    [action.params.gameId]: action.result.result.darts,
  }),
);

export default games;

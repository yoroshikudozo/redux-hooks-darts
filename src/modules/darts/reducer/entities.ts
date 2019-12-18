import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actions from 'modules/darts/actions';
import { Dart } from 'modules/darts/types';
import { ById } from 'modules/common/types';

const initialState: ById<Dart> = {};

export const entities = reducerWithInitialState(initialState).case(
  actions.fetchDartsByGameAsync.done,
  (state, action) => {
    return {
      entities: {
        ...action.result.entities,
        ...state.entities,
      },
    };
  },
);

export default entities;

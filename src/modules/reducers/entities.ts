import { combineReducers } from 'redux';

import { dartsReducer } from 'modules/darts/reducers';
import { gamesReducer } from 'modules/games/reducers';
import { roundsReducer } from 'modules/rounds/reducers';
import { rulesReducer } from 'modules/rules/reducers';
import { scoresReducer } from 'modules/scores/reducers';
import { usersReducer } from 'modules/users/reducers';

const entitiesReducer = combineReducers({
  darts: dartsReducer,
  games: gamesReducer,
  rounds: roundsReducer,
  rules: rulesReducer,
  scores: scoresReducer,
  users: usersReducer,
});

export default entitiesReducer;

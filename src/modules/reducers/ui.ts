import { combineReducers } from 'redux';

import { countUpReducer } from 'modules/reducers/ui/countUp';

const uiReducer = combineReducers({
  countUp: countUpReducer,
});

export default uiReducer;

// import { createSelector } from 'reselect';
import { AppState } from 'modules/reducers';

export const getRules = (state: AppState) => state.rules;

// const getUserRule = createSelector(
//   [getSelect, getRules],
//   (id, rules) =>
//     visibleTodos.filter(todo => todo.text.indexOf(keyword) > -1)
// )

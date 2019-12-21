import { AppState } from 'modules/reducers';

// import { createSelector } from 'reselect';

export const getRules = (state: AppState) => state.entities.rules;

// const getUserRule = createSelector(
//   [getSelect, getRules],
//   (id, rules) =>
//     visibleTodos.filter(todo => todo.text.indexOf(keyword) > -1)
// )

import * as ActionTypes from './routine_actions';

export const routines = function(state = {}, action) {
  if (action.type === ActionTypes.LIST_ROUTINES) {
    return Object.assign({}, state, action.data);
  } else {
    return state;
  }
};

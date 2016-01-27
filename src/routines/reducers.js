import * as ActionTypes from './routine_actions';

export const days = function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.LIST_ROUTINES:
      return Object.assign({}, state, action.data);
    case ActionTypes.DELETE_ROUTINE:
      const newState = Object.assign({}, state);
      delete newState[action.uuid];
      return state;
    default:
      return state;
  }
};

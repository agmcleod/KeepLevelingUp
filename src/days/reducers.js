import * as ActionTypes from './day_actions';

export const days = function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.LIST_DAYS:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

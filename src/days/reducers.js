import * as ActionTypes from './day_actions';

export const days = function(state = {}, action) {
  if (action.type === ActionTypes.LIST_DAYS) {
    return Object.assign({}, state, action.data);
  } else {
    return state;
  }
};

import * as ActionTypes from './routine_actions';
import {createUuid} from '../utils/utility_functions';

export const routines = function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.LIST_ROUTINES:
      return Object.assign({}, state, action.data);
    case ActionTypes.DELETE_ROUTINE:
      const newState = Object.assign({}, state);
      delete newState[action.uuid];
      return state;
    case ActionTypes.SET_ROUTINE:
      const data = action.data;
      if (!data.uuid) {
        data.uuid = createUuid();
      }
      return Object.assign({}, state, data);
    default:
      return state;
  }
};

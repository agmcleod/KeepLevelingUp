import * as ActionTypes from './day_actions';
import {createUuid} from '../utils/utility_functions';

export const days = function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.CREATE_DAY:
      const {previousDay, routine} = action;
      const newDay = {uuid: createUuid, created_at: new Date().toISOString()};
      if (previousDay) {
        
      }
    case ActionTypes.LIST_DAYS:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

import {combineReducers} from 'redux';
import * as ActionTypes from './day_actions';

const handleListAction = function(state = {}, action) {
  if (action.type === ActionTypes.LIST_DAYS) {
    return Object.assign({}, state, {days: action.data});
  } else {
    return state;
  }
};

export default combineReducers({
  handleListAction
});

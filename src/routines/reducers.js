import {combineReducers} from 'redux';
import * as ActionTypes from './routine_actions';

const handleListAction = function(state = {}, action) {
  if (action.type === ActionTypes.LIST_ROUTINES) {
    return Object.assign({}, state, {routines: action.data});
  } else {
    return state;
  }
};

export default combineReducers({
  handleListAction
});

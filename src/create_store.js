import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import getData from './middleware/get_data';
import saveData from './middleware/save_data';
import * as dayReducers from './days/reducers';
import * as routineReducers from './routines/reducers';
import {combineReducers} from 'redux';

const store = compose(
  applyMiddleware(thunk, getData, saveData)
)(createStore);

export default function configureStore(initialState) {
  return store(combineReducers({...dayReducers, ...routineReducers}), initialState);
}

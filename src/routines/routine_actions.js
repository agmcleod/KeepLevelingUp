import {GET_DATA} from '../middleware/get_data';
import {SAVE_DATA} from '../middleware/save_data';
import {createUuid} from '../utils/utility_functions';

export const SET_ROUTINE = 'SET_ROUTINE';
export const UPDATE_ROUTINE = 'UPDATE_ROUTINE';
export const LIST_ROUTINES = 'LIST_ROUTINES';
export const DELETE_ROUTINE = 'DELETE_ROUTINE';

export function setRoutine(data) {
  return (dispatch) => {
    for (const exercise of data.exercises) {
      if (!exercise.uuid) {
        exercise.uuid = createUuid();
      }
    }
    return dispatch({type: SET_ROUTINE, data: data});
  };
}

export function listRoutines() {
  return (dispatch) => {
    return dispatch({
      [GET_DATA]: {dataKey: 'routines', type: LIST_ROUTINES}
    });
  };
}

export function deleteRoutine(uuid) {
  return (dispatch) => {
    return dispatch({type: DELETE_ROUTINE, uuid});
  };
}

export function saveRoutines() {
  return (dispatch, getState) => {
    return dispatch({
      [SAVE_DATA]: {dataKey: 'routines', data: getState().routines}
    });
  };
}

import {GET_DATA} from '../middleware/get_data';
import {SAVE_DATA} from '../middleware/save_data';

export const LIST_ROUTINES = 'LIST_ROUTINES';
export const DELETE_ROUTINE = 'DELETE_ROUTINE';

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

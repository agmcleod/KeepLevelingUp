import {GET_DATA} from '../middleware/get_data';
import {SAVE_DATA} from '../middleware/save_data';

export const TOGGLE_COMPLETE_EXERCISE = 'TOGGLE_COMPLETE_EXERCISE';
export const CREATE_DAY = 'CREATE_DAY';
export const DELETE_DAY = 'DELETE_DAY';
export const LIST_DAYS = 'LIST_DAYS';
export const UPDATE_DAY = 'UPDATE_DAY';
export const VIEW_DAY = 'VIEW_DAY';

export function toggleCompleteExercise(dayUuid, exerciseUuid) {
  return (dispatch, getState) => {
    return dispatch({
      type: TOGGLE_COMPLETE_EXERCISE, exerciseUuid: exerciseUuid, dayUuid: dayUuid
    });
  };
}

export function createDay(routineUuid) {
  return (dispatch, getState) => {
    const routine = getState().routines[routineUuid];
    const daysData = getState().days;
    const dayUUIDs = Object.keys(daysData);
    let previousDay = null;
    dayUUIDs.forEach((uuid) => {
      const day = daysData[uuid];
      if (day.routine_uuid === routineUuid) {
        previousDay = day;
      }
    });

    return dispatch({
      type: CREATE_DAY, previousDay, routine, routineUuid
    });
  };
}

export function deleteDay(routineUuid) {
  return (dispatch) => {
    return dispatch({type: DELETE_DAY, uuid: routineUuid});
  };
}

export function listDays() {
  return (dispatch) => {
    return dispatch({
      [GET_DATA]: {dataKey: 'days', type: LIST_DAYS}
    });
  };
}

export function saveDays() {
  return (dispatch, getState) => {
    return dispatch({
      [SAVE_DATA]: {dataKey: 'days', data: getState().days}
    });
  };
}

export function updateDay(day) {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_DAY, day
    });
  };
}

export function viewDay(uuid) {
  return (dispatch) => {
    return dispatch({type: VIEW_DAY, uuid});
  };
}

import {GET_DATA} from '../middleware/get_data';

export const CREATE_DAY = 'CREATE_DAY';
export const LIST_DAYS = 'LIST_DAYS';

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
      type: CREATE_DAY, previousDay, routine
    });
  };
}

export function listDays() {
  return (dispatch) => {
    return dispatch({
      [GET_DATA]: {dataKey: 'days', type: LIST_DAYS}
    });
  };
}

export function saveDay() {
  
}

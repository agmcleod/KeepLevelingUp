import {GET_DATA} from '../middleware/get_data';

export const LIST_ROUTINES = 'LIST_ROUTINES';

export function listRoutines() {
  return (dispatch) => {
    return dispatch({
      [GET_DATA]: {dataKey: 'routines', type: LIST_ROUTINES}
    });
  };
}

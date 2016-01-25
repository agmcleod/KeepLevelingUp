import {GET_DATA} from '../middleware/get_data';

export const LIST_DAYS = 'LIST_DAYS';

export function listDays() {
  return (dispatch) => {
    return dispatch({
      [GET_DATA]: {dataKey: 'days', type: LIST_DAYS}
    });
  };
}

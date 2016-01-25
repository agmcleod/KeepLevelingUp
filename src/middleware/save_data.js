import {AsyncStorage} from 'react-native';

const saveDataForKey = function (key, data) {
  return AsyncStorage.setItem(key, JSON.stringify(data));
};

export const SAVE_DATA = Symbol('SAVE_DATA');
export default (store) => (next) => (action) => {
  const saveData = action[SAVE_DATA];
  if (typeof saveData === 'undefined') {
    return next(action);
  }

  return saveDataForKey(saveData.dataKey, saveData.data).then(() => next(action));
};

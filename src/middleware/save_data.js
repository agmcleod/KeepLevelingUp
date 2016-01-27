import {AsyncStorage} from 'react-native';

const saveDataForKey = function (key, data) {
  return AsyncStorage.setItem(key, JSON.stringify(data));
};

export const SAVE_DATA = Symbol('SAVE_DATA');

const actionWith = function(action, data) {
  const finalAction = Object.assign({}, action, data);
  delete finalAction[SAVE_DATA];
  return finalAction;
};

export default (store) => (next) => (action) => {
  const saveData = action[SAVE_DATA];
  if (typeof saveData === 'undefined') {
    return next(action);
  }

  return saveDataForKey(saveData.dataKey, saveData.data).then((data) => {
    if (saveData.type) {
      return next(actionWith(action, {data: data, type: saveData.type}));
    }
  });
};

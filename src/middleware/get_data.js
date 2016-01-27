import {AsyncStorage} from 'react-native';

const getDataForKey = function(key) {
  return AsyncStorage.getItem(key).then((data) => {
    return Promise.resolve(JSON.parse(data || '{}'));
  });
};

export const GET_DATA = Symbol('GET_DATA');

const actionWith = function(action, data) {
  const finalAction = Object.assign({}, action, data);
  delete finalAction[GET_DATA];
  return finalAction;
};

export default (store) => (next) => (action) => {
  const getData = action[GET_DATA];
  if (typeof getData === 'undefined') {
    return next(action);
  }

  return getDataForKey(getData.dataKey).then((data) => {
    return next(actionWith(action, {data: data, type: getData.type}));
  });
};

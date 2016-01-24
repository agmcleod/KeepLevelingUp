if (!Object.clone) {
  Object.clone = function (object) {
    const newObject = {};
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      newObject[keys[i]] = object[keys[i]];
    }
    return newObject;
  };
}

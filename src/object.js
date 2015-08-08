if (!Object.clone) {
  Object.clone = function (object) {
    var newObject = {};
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
      newObject[keys[i]] = object[keys[i]];
    }
    return newObject;
  }
}

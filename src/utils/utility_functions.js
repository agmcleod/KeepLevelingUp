export const numberAsString = function (n) {
  if (typeof n === 'number') {
    return String(n);
  } else {
    return n;
  }
};

export const createUuid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};
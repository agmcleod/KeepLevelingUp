const numberAsString = function (n) {
  if (typeof n === 'number') {
    return '' + n;
  }
  else {
    return n;
  }
};

const uuid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

export {
  numberAsString,
  uuid
};

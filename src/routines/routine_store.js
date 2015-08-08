'use strict';

var Reflux = require('reflux');
var RoutineActions = require('./routine_actions');

var RoutineStore = Reflux.createStore({
  init() {
    this.routines = [];
    this.listenTo(RoutineActions.listRoutines, this.listRoutines);
  },

  listRoutines() {
    this.trigger(this.routines);
  }
});

module.exports = RoutineStore;

'use strict';

import Reflux from 'reflux';
import RoutineActions from './routine_actions';
import uuid from '../uuid';

import React from 'react-native';
var {
  AsyncStorage
} = React;

var RoutineStore = Reflux.createStore({
  init() {
    this.routines = {};
    this.listenTo(RoutineActions.listRoutines, this.listRoutines);
    this.listenTo(RoutineActions.createRoutine, this.createRoutine);
  },

  createRoutine(data) {
    data.uuid = uuid();
    AsyncStorage.getItem("routines").then((routines) => {
      routines = JSON.parse(routines);
      if (!routines) {
        routines = {};
      }
      routines[data.uuid] = data;
      this.routines = routines;
      return AsyncStorage.setItem("routines", JSON.stringify(routines));
    })
    .then(() => {
      this.trigger(this.routines);
    })
    .catch((err) => console.err(err));
  },

  listRoutines() {
    this.trigger(this.routines);
  }
});

export default RoutineStore;

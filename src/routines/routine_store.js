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
    this.listenTo(RoutineActions.createRoutine, this.createRoutine);
    this.listenTo(RoutineActions.deleteRoutine, this.deleteRoutine);
    this.listenTo(RoutineActions.getRoutine, this.getRoutine);
    this.listenTo(RoutineActions.listRoutines, this.listRoutines);
    this.listenTo(RoutineActions.updateRoutine, this.updateRoutine);
  },

  createRoutine(data) {
    data.uuid = uuid();
    AsyncStorage.getItem("routines").then((routines) => {
      routines = JSON.parse(routines);
      if (!routines) {
        routines = {};
      }
      data.exercises.forEach((exercise) => {
        if (!exercise.uuid) {
          exercise.uuid = uuid();
        }
      });
      routines[data.uuid] = data;
      this.routines = routines;
      return AsyncStorage.setItem("routines", JSON.stringify(routines));
    })
    .then(() => this.trigger())
    .catch((err) => console.err(err));
  },

  deleteRoutine(uuid) {
    AsyncStorage.getItem("routines").then((routines) => {
      routines = JSON.parse(routines);
      delete routines[uuid];
      this.routines = routines;
      return AsyncStorage.setItem("routines", JSON.stringify(routines));
    })
    .then(() => {
      this.trigger(this.routines);
    })
    .catch((err) => console.err(err));
  },

  getRoutine(uuid) {
    AsyncStorage.getItem("routines").then((routines) => {
      routines = JSON.parse(routines);
      this.trigger(routines[uuid]);
    })
    .catch((err) => console.err(err));
  },

  listRoutines() {
    AsyncStorage.getItem("routines").then((routines) => {
      this.routines = JSON.parse(routines);
      this.trigger(this.routines);
    });
  },

  updateRoutine(data) {
    AsyncStorage.getItem("routines").then((routines) => {
      routines = JSON.parse(routines);
      routines[data.uuid] = data;
      this.routines = routines;
      return AsyncStorage.setItem("routines", JSON.stringify(routines));
    })
    .then(() => this.trigger())
    .catch((err) => console.err(err));
  }
});

export default RoutineStore;

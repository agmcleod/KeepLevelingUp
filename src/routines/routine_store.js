import Reflux from 'reflux';
import RoutineActions from './routine_actions';
import {createUuid} from '../utils/utility_functions';

import React from 'react-native';
const {AsyncStorage} = React;

const RoutineStore = Reflux.createStore({
  init() {
    this.routines = {};
    this.listenTo(RoutineActions.createRoutine, this.createRoutine);
    this.listenTo(RoutineActions.deleteRoutine, this.deleteRoutine);
    this.listenTo(RoutineActions.getRoutine, this.getRoutine);
    this.listenTo(RoutineActions.listRoutines, this.listRoutines);
    this.listenTo(RoutineActions.updateRoutine, this.updateRoutine);
  },

  createRoutine(data) {
    data.uuid = createUuid();
    AsyncStorage.getItem('routines').then((routines) => {
      const routineData = JSON.parse(routines) || {};
      data.exercises.forEach((exercise) => {
        if (!exercise.uuid) {
          exercise.uuid = createUuid();
        }
      });
      routineData[data.uuid] = data;
      this.routines = routineData;
      return AsyncStorage.setItem('routines', JSON.stringify(routineData));
    })
    .then(() => this.trigger())
    .catch((err) => console.err(err));
  },

  deleteRoutine(uuid) {
    AsyncStorage.getItem('routines').then((routines) => {
      const routineData = JSON.parse(routines);
      delete routineData[uuid];
      this.routines = routineData;
      return AsyncStorage.setItem('routines', JSON.stringify(routineData));
    })
    .then(() => {
      this.trigger(this.routines);
    })
    .catch((err) => console.err(err));
  },

  getRoutine(uuid) {
    return AsyncStorage.getItem('routines').then((routines) => {
      this.trigger(JSON.parse(routines)[uuid]);
    })
    .catch((err) => console.err(err));
  },

  getRoutineData(uuid) {
    return AsyncStorage.getItem('routines').then((routines) => {
      return Promise.resolve(JSON.parse(routines)[uuid]);
    });
  },

  listRoutines() {
    AsyncStorage.getItem('routines').then((routines) => {
      this.routines = JSON.parse(routines);
      this.trigger(this.routines);
    });
  },

  updateRoutine(data) {
    AsyncStorage.getItem('routines').then((routines) => {
      const routineData = JSON.parse(routines);
      routineData[data.uuid] = data;
      this.routines = routineData;
      return AsyncStorage.setItem('routines', JSON.stringify(routineData));
    })
    .then(() => this.trigger())
    .catch((err) => console.err(err));
  }
});

export default RoutineStore;

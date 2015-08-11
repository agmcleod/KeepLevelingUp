'use strict';

import Reflux from 'reflux';
import DayActions from './day_actions';
import uuid from '../uuid';
import React from 'react-native';

var {
  AsyncStorage
} = React;

var DayStore = Reflux.createStore({
  init() {
    this.listenTo(DayActions.createDay, this.createDay);
    this.selectedDay = null;
  }

  createDay(data) {
    data.uuid = uuid();
    AsyncStorage.getItem("days_" + data.routine_uuid).then((daysForRoutine) => {
      daysForRoutine = JSON.parse(daysForRoutine);
      if (!daysForRoutine) {
        daysForRoutine = {days: []};
      }

      daysForRoutine.days.push(data);
      this.selectedDay = data;
      return AsyncStorage.setItem("days_" + data.routine_uuid, JSON.stringify(daysForRoutine));
    })
    .then(() => {
      this.trigger(this.selectedDay);
    })
    .catch((err) => console.error(err));
  }

  getSelectedDay() {
    return this.selectedDay;
  }

  updateDay(data) {
    AsyncStorage.getItem("days_" + data.routine_uuid).then((daysForRoutine) => {
      daysForRoutine = JSON.parse(daysForRoutine);
      daysForRoutine[data.uuid] = data;
      this.selectedDay = data;
      return AsyncStorage.setItem("days_" + data.routine_uuid, JSON.stringify(daysForRoutine));
    })
    .then(() => {
      this.trigger(this.selectedDay);
    })
    .catch((err) => console.error(err));
  }
})

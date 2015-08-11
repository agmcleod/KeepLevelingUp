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
    this.listenTo(DayActions.listDays, this.listDays);
    this.listenTo(DayActions.updateDay, this.updateDay);
    this.selectedDay = null;
  },

  createDay(data) {
    data.uuid = uuid();
    data.created_at = new Date().toISOString();
    AsyncStorage.getItem("days").then((days) => {
      days = JSON.parse(days);
      if (!days) {
        days = {};
      }

      days[data.uuid] = data;
      this.selectedDay = data;
      return AsyncStorage.setItem("days", JSON.stringify(days));
    })
    .then(() => {
      this.trigger(this.selectedDay);
    })
    .catch((err) => console.error(err));
  },

  getSelectedDay() {
    return this.selectedDay;
  },

  listDays() {
    AsyncStorage.getItem("days").then((days) => {
      this.trigger(JSON.parse(days));
    });
  },

  updateDay(data) {
    AsyncStorage.getItem("days").then((days) => {
      days = JSON.parse(days);
      days[data.uuid] = data;
      this.selectedDay = data;
      return AsyncStorage.setItem("days", JSON.stringify(days));
    })
    .then(() => {
      this.trigger(this.selectedDay);
    })
    .catch((err) => console.error(err));
  }
});

export default DayStore;

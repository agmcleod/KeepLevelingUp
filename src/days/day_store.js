'use strict';

import Reflux from 'reflux';
import DayActions from './day_actions';
import uuid from '../uuid';
import React from 'react-native';
import RoutineStore from '../routines/routine_store';

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
    RoutineStore.getRoutineData(data.routine_uuid)
    .then((routine) => {
      data.exercises = [];
      routine.exercises.forEach((exercise) => {
        var ex = {...exercise, sets: []};
        for (var i = 0; i < exercise.sets; i++) {
          ex.sets.push({ weight: ex.showWeight ? 0 : undefined, reps: ex.reps, duration: ex.duration });
        }
        data.exercises.push(ex);
      });
      return AsyncStorage.getItem("days");
    })
    .then((days) => {
      days = JSON.parse(days);
      if (!days) {
        days = {};
      }

      var dayUUIDs = Object.keys(days);
      var lastDayForRoutine = null;
      dayUUIDs.forEach((uuid) => {
        var day = days[uuid];
        if (day.routine_uuid === data.routine_uuid) {
          lastDayForRoutine = day;
        }
      });

      if (lastDayForRoutine) {
        lastDayForRoutine.exercises.forEach((lastDayExercise) => {
          var dayEx = data.exercises.find((ex) => ex.uuid === lastDayExercise.uuid);
          if (dayEx) {
            lastDayExercise.sets.forEach((lastDaySet, setIndex) => {
              var set = dayEx.sets[setIndex];
              set.last_reps = lastDaySet.reps;
              set.weight = lastDaySet.weight;
              set.last_duration = lastDaySet.duration;
            });

            if (typeof lastDayExercise.alternate_name !== "undefined") {
              dayEx.last_done_with = lastDayExercise.alternate_name;
            }
          }
        });
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

  listDays(limit) {
    AsyncStorage.getItem("days").then((days) => {
      days = JSON.parse(days);
      var uuids = Object.keys(days);
      if (limit && limit < uuids.length) {
        var limitDays = {};
        for (var i = uuids.length - limit; i < uuids.length; i++) {
          var uuid = uuids[i];
          limitDays[uuid] = days[uuid];
        }
        this.trigger(limitDays);
      }
      else {
        this.trigger(days);
      }
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

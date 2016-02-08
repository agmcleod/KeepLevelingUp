import * as ActionTypes from './day_actions';
import {createUuid} from '../utils/utility_functions';

const createSetFromPreviousDay = function(previousDaySet) {
  return {
    last_reps: previousDaySet.reps, weight: previousDaySet.weight, last_duration: previousDaySet.duration
  };
};

export const days = function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.CREATE_DAY:
      const {previousDay, routine} = action;
      const newDay = {uuid: createUuid, created_at: new Date().toISOString(), exercises: []};
      for (const exercise of routine.exercies) {
        const dayExercise = {...exercise, sets: []};
        for (let i = 0; i < exercise.sets; i++) {
          dayExercise.sets.push({
            weight: dayExercise.showWeight ? 0 : undefined, reps: dayExercise.reps, duration: dayExercise.duration
          });
        }

        newDay.exercises.push(dayExercise);
      }
      if (previousDay) {
        for (const previousDayExercise of previousDay.exercises) {
          const newDayEx = newDay.exercises.find((ex) => ex.uuid === previousDayExercise.uuid);
          if (newDayEx) {
            for (let i = 0; i < previousDayExercise.sets.length; i++) {
              const set = newDayEx.sets[i];
              if (set) {
                const previousDaySet = previousDayExercise.sets[i];
                Object.assign(set, createSetFromPreviousDay(previousDaySet, set));
              }
            }
          }
        }
      }
      const daysData = Object.assign({}, state.days, {[newDay.uuid]: newDay});
      return Object.assign({}, state, {days: daysData});
    case ActionTypes.LIST_DAYS:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

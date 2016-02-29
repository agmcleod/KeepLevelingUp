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
      const {previousDay, routine, routineUuid} = action;
      const newDay = {
        uuid: createUuid(), created_at: new Date().toISOString(), exercises: [], routine_uuid: routineUuid
      };
      for (const exercise of routine.exercises) {
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
      return Object.assign({}, state, {[newDay.uuid]: newDay});
    case ActionTypes.DELETE_DAY:
      delete state[action.uuid];
      return Object.assign({}, state);
    case ActionTypes.LIST_DAYS:
      return Object.assign({}, state, action.data);
    case ActionTypes.UPDATE_DAY:
      return Object.assign({}, state, {[action.day.uuid]: Object.assign({}, action.day)});
    case ActionTypes.TOGGLE_COMPLETE_EXERCISE:
      const day = state[action.dayUuid];
      let exercise = null;
      for (var i = 0; i < day.exercises.length; i++) {
        const ex = day.exercises[i];
        if (ex.uuid === action.exerciseUuid) {
          day.exercises[i] = Object.assign({}, ex, {completed: !ex.completed});
          break;
        }
      }

      return Object.assign({}, state, {[day.uuid]: Object.assign({}, day)});

    default:
      return state;
  }
};

export const viewingDayUuid = function(state = null, action) {
  switch (action.type) {
    case ActionTypes.VIEW_DAY:
      return action.uuid;
    case ActionTypes.CREATE_DAY:
    case ActionTypes.DELETE_DAY:
      return null;
    default:
      return state;
  }
};

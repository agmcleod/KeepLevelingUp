'use strict';

import React from 'react-native';

var {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} = React;

var styles = StyleSheet.create({
  exerciseName: {
    color: "#555",
    fontSize: 16,
    fontWeight: 'bold'
  },
  set: {
    marginTop: 15,
    padding: 5,
    paddingBottom: 10
  },
  view: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#888',
    flex: 1,
    marginBottom: 10,
    padding: 15
  }
});

import ExerciseField from './exercise_field.ios';

class Exercise extends Component {
  _onExerciseFieldChange(event, i, field) {
    var text = parseFloat(event.nativeEvent.text);
    this.props.exercise.sets[i][field] = text;
  }
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.exerciseName}>{this.props.exercise.name}</Text>
        {this.props.exercise.sets.map((set, i) => {
          return (
            <View key={"exercise_" + i} style={styles.set}>
              {typeof set.weight === "number" ? <ExerciseField label="Weight" onChange={(e) => { this._onExerciseFieldChange(e, i, "weight") }} value={set.weight} /> : null}
              {typeof set.reps === "number" ? <ExerciseField label="Reps" onChange={(e) => { this._onExerciseFieldChange(e, i, "reps") }} value={set.reps} noteValue={set.last_reps} /> : null}
              {typeof set.duration === "number" ? <ExerciseField label="Duration" onChange={(e) => { this._onExerciseFieldChange(e, i, "duration") }} value={set.duration} noteValue={set.last_duration} /> : null}
            </View>
          );
        })}

      </View>
    );
  }
}

export default Exercise;

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
  exerciseInput: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#555',
    flex: 4,
    height: 40,
    padding: 5
  },
  exerciseName: {
    color: "#555",
    fontSize: 16,
    fontWeight: 'bold'
  },
  exerciseRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginBottom: 5
  },
  exerciseText: {
    alignSelf: 'stretch',
    color: "#555",
    flex: 1,
    marginRight: 10,
    fontSize: 16,
    textAlign: 'right'
  },
  set: {
    borderBottomWidth: 1,
    borderColor: '#888',
    marginTop: 15,
    padding: 5,
    paddingBottom: 15
  },
  view: {
    flex: 1,
    padding: 5
  }
});

class ExerciseValue extends Component {
  render() {
    return (
      <View style={styles.exerciseRow}>
        <Text style={styles.exerciseText}>{this.props.label}:</Text>
        <TextInput value={"" + this.props.value} style={styles.exerciseInput} />
      </View>
    );
  }
}

class Exercise extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.exerciseName}>{this.props.exercise.name}</Text>
        {this.props.exercise.sets.map((set, i) => {
          return (
            <View key={"exercise_" + i} style={styles.set}>
              {typeof set.weight === "number" ? <ExerciseValue label="Weight" value={set.weight} /> : null}
              {typeof set.reps === "number" ? <ExerciseValue label="Reps" value={set.reps} /> : null}
              {typeof set.duration === "number" ? <ExerciseValue label="Duration" value={set.duration} /> : null}
            </View>
          );
        })}

      </View>
    );
  }
}

export default Exercise;

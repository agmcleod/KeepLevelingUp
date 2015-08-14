'use strict';

import React from 'react-native';

var {
  Component,
  StyleSheet,
  Text,
  View
} = React;

var styles = StyleSheet.create({
  exerciseName: {
    color: "#555",
    fontSize: 14,
    fontWeight: 'bold'
  },
  exerciseValue: {
    color: "#555",
    fontSize: 14
  },
  view: {
    flex: 1,
    padding: 5
  }
});

class Exercise extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.exerciseName}>{this.props.exercise.name}</Text>
        {this.props.exercise.sets.forEach((set) => {
          return (
            <View>
              {typeof this.props.exercise.weight === "number" ? <View><Text style={styles.label}>Weight: </Text><Text style={styles.exerciseValue}>{this.props.exercise.weight}</Text></View> : null}
              {typeof this.props.exercise.reps === "number" ? <View><Text style={styles.label}>Reps: </Text><Text style={styles.exerciseValue}>{this.props.exercise.reps}</Text></View> : null}
              {typeof this.props.exercise.duration === "number" ? <View><Text style={styles.label}>Duration: </Text><Text style={styles.exerciseValue}>{this.props.exercise.duration}</Text></View> : null}
            </View>
          );
        })}

      </View>
    );
  }
}

export default Exercise;

'use strict';

import React from 'react-native';

var {
  Component,
  StyleSheet,
  Text,
  View
} = React;

var style = StyleSheet.create({
  exerciseName: {
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
      </View>
    );
  }
}

export default Exercise;

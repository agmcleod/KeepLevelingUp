import React from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  counter: {
    color: '#555',
    fontFamily: 'Optima',
    fontSize: 16,
    width: 20
  },

  exerciseName: {
    fontFamily: 'Optima',
    fontSize: 14,
    marginTop: 5
  },

  exerciseWrapper: {
    marginTop: 10
  },

  setDetails: {
    color: '#555',
    fontFamily: 'Optima',
    fontSize: 16
  },

  setWrapper: {
    flexDirection: 'row'
  },

  setsWrapper: {
    marginTop: 10,
    paddingLeft: 10
  }
});

export default class ExerciseValue extends React.Component {
  static displayName = 'ExerciseValue';
  static propTypes = {
    exercise: React.PropTypes.shape({
      name: React.PropTypes.string,
      sets: React.PropTypes.array
    }).isRequired
  };

  render() {
    return (
      <View style={styles.exerciseWrapper}>
        <Text style={styles.exerciseName}>{this.props.exercise.name}</Text>
        <View style={styles.setsWrapper}>
          {this.props.exercise.sets.map((set, i) => {
            let setString = '';
            if (typeof set.reps === 'number') {
              setString += set.reps;
            }
            if (typeof set.weight === 'number') {
              if (setString !== '') {
                setString += ' x ';
              }
              setString += (set.weight) + 'lbs ';
            }
            if (typeof set.duration === 'number') {
              setString += ' for ' + (set.duration);
            }
            return (
              <View key={`${set.uuid}-${i}`} style={styles.setWrapper}>
                <Text style={styles.counter}>{i + 1}.</Text>
                <Text style={styles.setDetails}>{setString}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

import React from 'react-native';

const {
  Component,
  StyleSheet,
  Text,
  View
} = React;

const styles = StyleSheet.create({
  exerciseName: {
    color: '#555',
    fontFamily: 'Optima',
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

import ExerciseField from './exercise_field';

class Exercise extends Component {
  static displayName = 'Exercise';
  static propTypes = {
    exercise: React.PropTypes.shape({
      name: React.PropTypes.string,
      sets: React.PropTypes.array
    }).isRequired
  };

  _getExerciseFieldForProperty(label, propName, object, index) {
    if (typeof object[propName] === 'number') {
      return (
        <ExerciseField
          label={label}
          onChange={(e) => {this._onExerciseFieldChange(e, index, propName);}}
          value={object[propName]} />
      );
    }
  }

  _onExerciseFieldChange(event, i, field) {
    const text = parseFloat(event.nativeEvent.text);
    this.props.exercise.sets[i][field] = text;
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.exerciseName}>{this.props.exercise.name}</Text>
        {this.props.exercise.sets.map((set, i) => {
          return (
            <View key={'exercise_' + i} style={styles.set}>
              {this._getExerciseFieldForProperty('Weight', 'weight', set, i)}
              {this._getExerciseFieldForProperty('Reps', 'reps', set, i)}
              {this._getExerciseFieldForProperty('Duration', 'duration', set, i)}
            </View>
          );
        })}

      </View>
    );
  }
}

export default Exercise;

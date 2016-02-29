import React from 'react-native';
import {connect} from 'react-redux';
import {toggleCompleteExercise} from './day_actions';
import Icon from 'react-native-vector-icons/FontAwesome';

const {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

const styles = StyleSheet.create({
  checkmark: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    width: 25,
    height: 25,
    borderColor: '#39b54a',
    overflow: 'hidden'
  },
  checkmarkActive: {
    backgroundColor: '#39b54a'
  },
  checkmarkInactive: {
    borderColor: '#39b54a'
  },
  completed: {
    borderColor: '#39b54a'
  },
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    toggleCompleteExercise: React.PropTypes.func.isRequired,
    exercise: React.PropTypes.shape({
      completed: React.PropTypes.bool,
      name: React.PropTypes.string,
      sets: React.PropTypes.array,
      uuid: React.PropTypes.string
    }).isRequired,
    dayUuid: React.PropTypes.string.isRequired
  };

  _getExerciseFieldForProperty(label, propName, object, index, noteValue) {
    if (typeof object[propName] === 'number') {
      return (
        <ExerciseField
          label={label}
          onChange={(e) => {this._onExerciseFieldChange(e, index, propName);}}
          noteValue={noteValue}
          value={object[propName]} />
      );
    }
  }

  _onExerciseFieldChange(event, i, field) {
    const text = parseFloat(event.nativeEvent.text);
    this.props.exercise.sets[i][field] = text;
  }

  _onToggleActivity() {
    this.props.toggleCompleteExercise(this.props.dayUuid, this.props.exercise.uuid);
  }

  render() {
    const viewStyle = [styles.view];
    if (this.props.exercise.completed) {
      viewStyle.push(styles.completed);
    }
    const checkmarkStyles = [styles.checkmark];
    checkmarkStyles.push(this.props.exercise.completed ? styles.checkmarkActive : styles.checkmarkInactive);
    return (
      <View style={viewStyle}>
        <View style={styles.topRow}>
          <Text style={styles.exerciseName}>{this.props.exercise.name}</Text>
          <TouchableOpacity onPress={this._onToggleActivity.bind(this)}>
            <View style={checkmarkStyles}>
              <Icon color={this.props.exercise.completed ? '#ffffff' : '#39b54a'} name='check' size={18} />
            </View>
          </TouchableOpacity>
        </View>
        {this.props.exercise.sets.map((set, i) => {
          return (
            <View key={'exercise_' + i} style={styles.set}>
              {this._getExerciseFieldForProperty('Weight', 'weight', set, i)}
              {this._getExerciseFieldForProperty('Reps', 'reps', set, i, set.last_reps)}
              {this._getExerciseFieldForProperty('Duration', 'duration', set, i, set.last_duration)}
            </View>
          );
        })}

      </View>
    );
  }
}

export default connect(() => {
  return {};
}, {
  toggleCompleteExercise
})(Exercise);

import React from 'react-native';

const {
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

import DayActions from './day_actions';
import EditDay from './edit_day';
import friendlyDay from '../friendly_day';

const styles = StyleSheet.create({
  counter: {
    color: '#555',
    fontFamily: 'Optima',
    fontSize: 16,
    width: 20
  },
  dayActions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dayHeader: {
    color: '#000',
    fontFamily: 'Optima',
    fontSize: 18,
    fontWeight: 'bold'
  },
  daySection: {
    padding: 20,
    flex: 9
  },
  deleteDayTouch: {
    alignSelf: 'flex-start',
    backgroundColor: '#BB4949',
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginTop: 20
  },
  deleteDayText: {
    color: '#fff',
    fontFamily: 'Optima',
    fontSize: 16
  },
  editDayText: {
    color: '#fff',
    fontFamily: 'Optima',
    fontSize: 16
  },
  editDayTouch: {
    alignSelf: 'flex-start',
    backgroundColor: '#39b54a',
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginTop: 20
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

class ExerciseValue extends Component {
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

class DayOverview extends Component {
  static displayName = 'DayOverview';
  static propTypes = {
    day: React.PropTypes.shape({
      uuid: React.PropTypes.string,
      created_at: React.PropTypes.string,
      exercises: React.PropTypes.array
    }).isRequired,
    navigator: React.PropTypes.object,
    parentListen: React.PropTypes.func.isRequired,
    parentUnlisten: React.PropTypes.func.isRequired
  };
  _deleteDayPressEvent() {
    DayActions.deleteDay(this.props.day.uuid);
  }
  _editDayPressEvent() {
    this.props.parentUnlisten();
    this.props.navigator.push({
      component: EditDay,
      props: {parentListen: this.props.parentListen, day: this.props.day}
    });
  }

  render() {
    const screen = Dimensions.get('window');
    const day = this.props.day;
    return (
      <ScrollView key={day.uuid} style={[{width: screen.width}, styles.daySection]} pagingEnabled={false}>
        <Text style={styles.dayHeader}>{friendlyDay(day.created_at)}</Text>
        <View style={styles.dayActions}>
          <TouchableHighlight
            style={styles.editDayTouch}
            underlayColor='#C0FAC4'
            onPress={this._editDayPressEvent.bind(this)}>
            <Text style={styles.editDayText}>Edit</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.deleteDayTouch}
            underlayColor='#ff8888'
            onPress={this._deleteDayPressEvent.bind(this)}>
            <Text style={styles.deleteDayText}>Delete</Text>
          </TouchableHighlight>
        </View>
        {day.exercises.map((ex, i) => <ExerciseValue key={`exercise_value_${i}`} exercise={ex} />)}
      </ScrollView>
    );
  }
}

export default DayOverview;

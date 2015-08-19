'use strict';

import React from 'react-native';

var {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  View
} = React;

import BottomBar from '../components/bottom_bar.ios';
import Exercise from './exercise.ios';
import RoutineStore from '../routines/routine_store';
import RoutineActions from '../routines/routine_actions';

var styles = StyleSheet.create({
  dayContainer: {
    margin: 20
  },
  dayHeader: {
    color: '#555',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  scrollView: {
    flex: 10
  },
  view: {
    flex: 1
  }
});

class ViewDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    };
  }
  componentDidMount() {
    this._listen();
    RoutineActions.getRoutine(this.props.day.routine_uuid);
  }

  componentWillUnmount() {
    this._unlisten();
    this.props.parentListen();
  }

  _listen() {
    this._subscription = RoutineStore.listen(this._onRoutinesChange.bind(this));
  }

  _onRoutinesChange(routine) {
    var exercises = [];
    var day = this.props.day;
    routine.exercises.forEach((exercise) => {
      var dayExercise = null;
      if (day.exercises) {
        day.exercises.forEach((dayEx) => {
          if (dayEx.uuid === exercise.uuid) {
            dayExercise = dayEx;
          }
        });

        if (dayExercise) {
          exercises.push(dayExercise);
        }
      }
      if (!dayExercise) {
        var ex = {
          uuid: exercise.uuid,
          name: exercise.name,
          sets: []
        };
        for (var i = 0; i < exercise.sets; i++) {
          var object = { weight: exercise.showWeight ? 0 : undefined, reps: exercise.reps, duration: exercise.duration };
          ex.sets.push(object);
        }
        exercises.push(ex);
      }
    });

    this.setState({
      exercises: exercises
    });
  }

  _onSavePressEvent() {
    this.props.navigator.pop();
  }

  _unlisten() {
    this._subscription();
  }

  render() {
    var buttons = [{
      text: "Save",
      onPressEvent: this._onSavePressEvent.bind(this)
    }];
    return (
      <View style={styles.view}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.dayContainer}>
            <Text style={styles.dayHeader}>{this.props.day.created_at}</Text>
            {this.state.exercises.map((exercise) => <Exercise key={exercise.uuid} exercise={exercise} />)}
          </View>
        </ScrollView>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default ViewDay;

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
    RoutineActions.getRoutine();
  }

  _listen() {
    this._subscription = RoutineStore.listen(this._onRoutinesChange.bind(this));
  }

  _onBackPressEvent() {
    this.props.parentListen();
    this.props.navigator.pop();
  }

  _onRoutinesChange(routine) {
    var exercises = [];
    var day = this.props.day;
    routine.exercises.forEach((exercise) => {
      if (day.exercises) {
        var dayExercise = null;
        day.exercises.forEach((dayEx) => {
          if (dayEx.uuid === exercise.uuid) {
            dayExercise = dayEx;
          }
        });

        if (dayExercise) {
          exercises.push(dayExercise);
        }
        else {
          exercises.push(exercise);
        }
      }
      else {
        exercises.push(exercise);
      }
    });

    this.setState({
      exercises: exercises
    });
  }

  _unlisten() {
    this._subscription();
  }

  render() {
    var buttons = [{
      text: "Back",
      onPressEvent: this._onBackPressEvent.bind(this)
    }];
    return (
      <View style={styles.view}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.dayContainer}>
            <Text>{this.props.day.created_at}</Text>
          </View>
        </ScrollView>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default ViewDay;

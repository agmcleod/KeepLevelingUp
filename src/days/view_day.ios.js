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
  componentWillUnmount() {
    this.props.parentListen();
  }

  _onSavePressEvent() {
    this.props.navigator.pop();
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
            {this.props.day.exercises.map((exercise) => <Exercise key={exercise.uuid} exercise={exercise} />)}
          </View>
        </ScrollView>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default ViewDay;

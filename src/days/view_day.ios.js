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

import DayStore from './day_store';
import DayActions from './day_actions';
import friendlyDay from '../friendly_day.js';

var styles = StyleSheet.create({
  dayContainer: {
    margin: 20
  },
  dayHeader: {
    color: '#000',
    fontFamily: 'Optima',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30
  },
  scrollView: {
    flex: 10
  },
  view: {
    flex: 1
  }
});

class ViewDay extends Component {
  componentDidMount() {
    this._listen();
  }

  componentWillUnmount() {
    this.props.parentListen();
    this._unlisten();
  }

  _listen() {
    this._subscription = DayStore.listen(this._onDayUpdate.bind(this));
  }

  _onDayUpdate() {
    this.props.navigator.pop();
  }

  _onSavePressEvent() {
    DayActions.updateDay(this.props.day);
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
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps={false}>
          <View style={styles.dayContainer}>
            <Text style={styles.dayHeader}>{friendlyDay(this.props.day.created_at)}</Text>
            {this.props.day.exercises.map((exercise) => <Exercise key={exercise.uuid} exercise={exercise} />)}
          </View>
        </ScrollView>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default ViewDay;

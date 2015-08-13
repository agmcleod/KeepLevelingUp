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
  _onBackPressEvent() {
    this.props.parentListen();
    this.props.navigator.pop();
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

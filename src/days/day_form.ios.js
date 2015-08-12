'use strict';

import React from 'react-native';

var {
  Component,
  ScrollView,
  StyleSheet,
  View
} = React;

import BottomBar from '../components/bottom_bar.ios';

var styles = StyleSheet.create({
  scrollView: {
    flex: 10
  },
  view: {
    flex: 1,
    flexDirection: 'column'
  }
});

class DayForm extends Component {
  _cancelPressEvent() {
    this.props.parentListen();
    this.props.navigator.pop();
  }
  render() {
    var buttons = [{
      text: "Cancel",
      onPressEvent: this._cancelPressEvent.bind(this)
    }, {
      text: "Save"
    }];
    return (
      <View style={styles.view}>
        <ScrollView style={styles.scrollView}>

        </ScrollView>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default DayForm;

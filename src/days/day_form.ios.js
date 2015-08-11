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
  render() {
    var buttons = [{
      text: "Cancel",
      onPressEvent: this._cancelPressEvent
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

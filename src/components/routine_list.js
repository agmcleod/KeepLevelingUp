'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  View
} = React;

var BottomBar = require('./bottom_bar');

var styles = StyleSheet.create({
  wrapper: {

  }
});

class RoutineList extends Component {
  render() {
    return(
      <View style={styles.wrapper}>
        <BottomBar buttons={[{text: "Cancel"}, { text: "New Routine" }]} />
      </View>
    );
  }
}

module.exports = RoutineList;

'use strict';

var React = require('react-native');

var {
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} = React;

var BottomBar = require('./bottom_bar');

var styles = StyleSheet.create({
  scrollView: {
    flex: 10,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  }
});

class RoutineList extends Component {
  _cancelButton() {
    this.props.navigator.pop();
  }
  render() {
    var screen = Dimensions.get("window");
    var bottomButtons = [{
      text: "Cancel",
      onPressEvent: this._cancelButton.bind(this)
    }, {
      text: "New Routine"
    }];
    return(
      <View style={styles.view}>
        <ScrollView style={[{ width: screen.width }, styles.scrollView]}>

        </ScrollView>
        <BottomBar buttons={bottomButtons} />
      </View>
    );
  }
}

module.exports = RoutineList;

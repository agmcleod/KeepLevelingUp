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
    flex: 10
  },
  view: {
    flex: 1,
    flexDirection: 'column'
  }
});

class NewRoutine extends Component {
  _cancelButton() {
    this.props.parentListen();
    this.props.navigator.pop();
  }
  render() {
    var buttons = [{
      text: "Cancel",
      onPressEvent: this._cancelButton.bind(this)
    }, {
      text: "Create"
    }];
    return (
      <View style={styles.view}>
        <ScrollView style={styles.scrollView}></ScrollView>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default NewRoutine;

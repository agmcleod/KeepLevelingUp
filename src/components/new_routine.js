'use strict';

var React = require('react-native');

var {
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

var BottomBar = require('./bottom_bar');

var styles = StyleSheet.create({
  addExercise: {
    color: '#ffffff'
  },
  addExerciseTouch: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#e57f7f',
    padding: 15,
    marginTop: 30,
    marginBottom: 10
  },
  scrollView: {
    flex: 10,
    padding: 15
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E57F7F',
    flex: 1,
    height: 35,
    padding: 5
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
        <ScrollView style={styles.scrollView}>
          <TextInput placeholder="Routine Name" style={styles.textInput} />
          <TouchableHighlight style={styles.addExerciseTouch} underlayColor="#ffffff">
            <Text style={styles.addExercise}>Add Exercise</Text>
          </TouchableHighlight>
        </ScrollView>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default NewRoutine;

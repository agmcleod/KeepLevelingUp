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

import BottomBar from './bottom_bar';
import ExerciseForm from './exercise_form';

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
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    };
  }
  _addExercise() {
    this.refs.textInput.blur();
    var exercises = this.state.exercises;
    exercises.push({});
    this.setState({
      exercises: exercises
    });
  }
  _cancelButton() {
    this.props.parentListen();
    this.props.navigator.pop();
  }

  _onChildNumberInputChange(event, i, field) {
    var exercises = this.state.exercises;
    exercises[i][field] = parseFloat(event.nativeEvent.text);
    this.setState({
      exercises: exercises
    });
  }

  _onChildTextInputChange(event, i, field) {
    var exercises = this.state.exercises;

    exercises[i][field] = event.nativeEvent.text;
    this.setState({
      exercises: exercises
    });
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
          <TextInput placeholder="Routine Name" ref="textInput" style={styles.textInput} />
          <TouchableHighlight style={styles.addExerciseTouch} underlayColor="#ffffff" onPress={this._addExercise.bind(this)}>
            <Text style={styles.addExercise}>Add Exercise</Text>
          </TouchableHighlight>
          {this.state.exercises.map((obj, i) => <ExerciseForm index={i} onTextInputChange={this._onChildTextInputChange.bind(this)} onNumberInputChange={this._onChildNumberInputChange.bind(this)} />)}
        </ScrollView>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default NewRoutine;

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

import BottomBar from '../components/bottom_bar.ios';
import ExerciseForm from './exercise_form.ios';
import RoutineActions from './routine_actions';
import RoutineStore from './routine_store';

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
  error: {
    marginTop: 5,
    marginBottom: 5,
    color: 'red',
    flex: 1
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

class RoutineForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      errors: {},
      name: null,
      uuid: null
    };
  }

  componentDidMount() {
    this._subscription = RoutineStore.listen(this._onRoutineChange.bind(this));
  }

  componentWillMount() {
    if (this.props.routine) {
      this.setState({
        name: this.props.routine.name,
        uuid: this.props.routine.uuid,
        exercises: this.props.routine.exercises
      });
    }
  }

  componentWillUnmount() {
    this._subscription();
    this.props.parentListen();
  }

  _addExercise() {
    this.refs.textInput.blur();
    var exercises = this.state.exercises;
    exercises.push({});
    this.setState({
      exercises: exercises
    });
  }
  _cancelPressEvent() {
    this.props.navigator.pop();
  }

  // TODO: Add validation for at least one
  _onChildNumberInputChange(event, i, field) {
    var exercises = this.state.exercises;
    exercises[i][field] = parseFloat(event.nativeEvent.text);
    this.setState({
      exercises: exercises
    });
  }

  _onChildShowWeightChange(value, i) {
    var exercises = this.state.exercises;
    exercises[i].showWeight = value;
    this.setState({
      exercises: exercises
    });
  }

  _onChildTextInputChange(event, i, field) {
    var exercises = this.state.exercises;
    var text = event.nativeEvent.text;
    exercises[i][field] = event.nativeEvent.text;
    this.setState({
      exercises: exercises
    });
  }

  _onRoutineChange() {
    this.props.navigator.pop();
  }

  _onSave() {
    var exercises = this.state.exercises;
    var hasErrors = false;
    var errors = this.state.errors;
    if (!this.state.name) {
      hasErrors = true;
      errors['name'] = ["Must have a value"];
    }
    exercises.forEach((exercise) => {
      if (!exercise.name) {
        hasErrors = true;
        exercise['errors'] = { "name": ["Must have a value"] }
      }
    });
    if (hasErrors) {
      this.setState({ exercises: exercises, errors: errors });
    }
    else {
      if (this.state.uuid) {
        RoutineActions.updateRoutine({ name: this.state.name, uuid: this.state.uuid, exercises: this.state.exercises });
      }
      else {
        RoutineActions.createRoutine({ name: this.state.name, exercises: this.state.exercises });
      }
    }
  }

  _onTextInputChange(event, field) {
    var state = {};
    state[field] = event.nativeEvent.text;
    this.setState(state);
  }

  _removeExercise(index) {
    var exercises = this.state.exercises;
    exercises.splice(index, 1);
    this.setState({
      exercises: exercises
    });
  }

  render() {
    var text = this.props.routine ? "Update" : "Create";
    var buttons = [{
      text: "Cancel",
      onPressEvent: this._cancelPressEvent.bind(this)
    }, {
      text: text,
      onPressEvent: this._onSave.bind(this)
    }];
    return (
      <View style={styles.view}>
        <ScrollView style={styles.scrollView}>
          <TextInput placeholder="Routine Name" ref="textInput" style={styles.textInput} onChange={(e) => this._onTextInputChange(e, "name")} value={this.state.name} />
          {this.state.errors['name'] ? <Text style={styles.error}>{this.state.errors['name'].join(', ')}</Text> : null}
          {this.state.exercises.map((obj, i) => {
            return <ExerciseForm
              index={i}
              exercise={this.state.exercises[i]}
              onTextInputChange={this._onChildTextInputChange.bind(this)}
              onNumberInputChange={this._onChildNumberInputChange.bind(this)}
              onShowWeightChange={this._onChildShowWeightChange.bind(this)}
              removeExercise={this._removeExercise.bind(this)} />
          })}
          <TouchableHighlight style={styles.addExerciseTouch} underlayColor="#ffffff" onPress={this._addExercise.bind(this)}>
            <Text style={styles.addExercise}>Add Exercise</Text>
          </TouchableHighlight>
        </ScrollView>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default RoutineForm;

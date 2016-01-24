import React from 'react-native';

const {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

import BottomBar from '../components/bottom_bar';
import ExerciseForm from './exercise_form';
import RoutineActions from './routine_actions';
import RoutineStore from './routine_store';

import arrayMove from '../array_move';

const styles = StyleSheet.create({
  addExercise: {
    color: '#ffffff',
    fontFamily: 'Optima'
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
    fontFamily: 'Optima',
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
    fontFamily: 'Optima',
    height: 35,
    padding: 5
  },
  view: {
    flex: 1,
    flexDirection: 'column'
  }
});

class RoutineForm extends Component {
  static displayName = 'RoutineForm';
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    parentListen: React.PropTypes.func.isRequired,
    routine: React.PropTypes.shape({
      name: React.PropTypes.string,
      uuid: React.PropTypes.string,
      exercises: React.PropTypes.array
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      errors: {},
      name: null,
      uuid: null
    };
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

  componentDidMount() {
    this._subscription = RoutineStore.listen(this._onRoutineChange.bind(this));
  }

  componentWillUnmount() {
    this._subscription();
    this.props.parentListen();
  }

  _addExercise() {
    this.refs.textInput.blur();
    const exercises = this.state.exercises;
    exercises.push({});
    this.setState({
      exercises: exercises
    });
  }
  _cancelPressEvent() {
    this.props.navigator.pop();
  }

  _moveDownPress(index) {
    let exercises = this.state.exercises;
    exercises = arrayMove(exercises, index, index + 1);
    this.setState({
      exercises: exercises
    });
  }

  _moveUpPress(index) {
    let exercises = this.state.exercises;
    exercises = arrayMove(exercises, index, index - 1);
    this.setState({
      exercises: exercises
    });
  }

  _onChildNumberInputChange(event, i, field) {
    const exercises = this.state.exercises;
    exercises[i][field] = parseFloat(event.nativeEvent.text);
    this.setState({
      exercises: exercises
    });
  }

  _onToggleWeightChange(i) {
    const exercises = this.state.exercises;
    exercises[i].showWeight = !exercises[i].showWeight;
    this.setState({
      exercises: exercises
    });
  }

  _onChildTextInputChange(event, i, field) {
    const exercises = this.state.exercises;
    exercises[i][field] = event.nativeEvent.text;
    this.setState({
      exercises: exercises
    });
  }

  _onRoutineChange() {
    this.props.navigator.pop();
  }

  _onSave() {
    const exercises = this.state.exercises;
    let hasErrors = false;
    const errors = this.state.errors;
    if (!this.state.name) {
      hasErrors = true;
      errors.name = ['Must have a value'];
    }
    exercises.forEach((exercise) => {
      if (!exercise.name) {
        hasErrors = true;
        exercise.errors = {name: ['Must have a value']};
      }
    });
    if (hasErrors) {
      this.setState({exercises: exercises, errors: errors});
    } else if (this.state.uuid) {
      RoutineActions.updateRoutine({name: this.state.name, uuid: this.state.uuid, exercises: this.state.exercises});
    } else {
      RoutineActions.createRoutine({name: this.state.name, exercises: this.state.exercises});
    }
  }

  _onTextInputChange(event, field) {
    const state = {};
    state[field] = event.nativeEvent.text;
    this.setState(state);
  }

  _removeExercise(index) {
    const exercises = this.state.exercises;
    exercises.splice(index, 1);
    this.setState({
      exercises: exercises
    });
  }

  render() {
    const text = this.props.routine ? 'Update' : 'Create';
    const buttons = [{
      text: 'Cancel',
      onPressEvent: this._cancelPressEvent.bind(this)
    }, {
      text: text,
      onPressEvent: this._onSave.bind(this)
    }];
    return (
      <View style={styles.view}>
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps={false}>
          <TextInput
            placeholder='Routine Name'
            ref='textInput'
            style={styles.textInput}
            onChange={(e) => this._onTextInputChange(e, 'name')}
            value={this.state.name} />
          {this.state.errors.name ? <Text style={styles.error}>{this.state.errors.name.join(', ')}</Text> : null}
          {this.state.exercises.map((obj, i) => {
            return (
              <ExerciseForm
                key={`ex-form-${i}`}
                index={i}
                exercise={this.state.exercises[i]}
                moveDownPress={this._moveDownPress.bind(this)}
                moveUpPress={this._moveUpPress.bind(this)}
                onTextInputChange={this._onChildTextInputChange.bind(this)}
                onNumberInputChange={this._onChildNumberInputChange.bind(this)}
                onToggleWeightChange={this._onToggleWeightChange.bind(this)}
                removeExercise={this._removeExercise.bind(this)}
                total={this.state.exercises.length} />
            );
          })}
          <TouchableHighlight
            style={styles.addExerciseTouch}
            underlayColor='#ffffff'
            onPress={this._addExercise.bind(this)}>
            <Text style={styles.addExercise}>Add Exercise</Text>
          </TouchableHighlight>
        </ScrollView>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default RoutineForm;
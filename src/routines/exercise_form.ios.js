'use strict';

var React = require('react-native');

import {numberAsString} from '../utils/utility_functions';

var {
  Component,
  StyleSheet,
  SwitchIOS,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

class ExerciseForm extends Component {
  _moveDownPress() {
    this.props.moveDownPress(this.props.index);
  }

  _moveUpPress() {
    this.props.moveUpPress(this.props.index);
  }


  _removePress() {
    this.props.removeExercise(this.props.index);
  }

  _outputErrorForField(field) {
    var exercise = this.props.exercise;
    if (exercise && exercise.errors && exercise.errors[field]) {
      return (
        <Text style={styles.error}>{exercise.errors[field].join(', ')}</Text>
      );
    }
  }

  render() {
    let moveUpButton = null;
    if (this.props.index > 0) {
      moveUpButton = (
        <TouchableHighlight
          onPress={this._moveUpPress.bind(this)}
          style={styles.moveButtonTouch}
          underlayColor="#ffffff">
          <Text style={styles.actionButtonText}>Move Up</Text>
        </TouchableHighlight>
      );
    }

    let moveDownButton = null;
    if (this.props.index < this.props.total - 1) {
      moveDownButton = (
        <TouchableHighlight
          onPress={this._moveDownPress.bind(this)}
          style={styles.moveButtonTouch}
          underlayColor="#ffffff">
          <Text style={styles.actionButtonText}>Move Down</Text>
        </TouchableHighlight>
      );
    }

    return (
      <View style={styles.view}>
        <TextInput
          style={styles.textInput}
          onChange={(e) => { this.props.onTextInputChange(e, this.props.index, "name"); }}
          placeholder="Name"
          defaultValue={this.props.exercise.name}
        />
        {this._outputErrorForField('name')}
        <TextInput
          style={styles.textInput}
          onChange={(e) => { this.props.onNumberInputChange(e, this.props.index, "sets"); }}
          placeholder="Sets"
          keyboardType="numeric"
          defaultValue={numberAsString(this.props.exercise.sets)} />
        <TextInput
          style={styles.textInput}
          onChange={(e) => { this.props.onNumberInputChange(e, this.props.index, "reps"); }}
          placeholder="Reps"
          keyboardType="numeric"
          defaultValue={numberAsString(this.props.exercise.reps)} />
        <TextInput
          style={styles.textInput}
          onChange={(e) => { this.props.onNumberInputChange(e, this.props.index, "duration"); }}
          placeholder="Duration in Seconds"
          keyboardType="numeric"
          defaultValue={numberAsString(this.props.exercise.duration)} />
        <View style={styles.showWeight}>
          <Text style={styles.showWeightText}>Show Weight:</Text>
          <SwitchIOS
            value={this.props.exercise.showWeight}
            onValueChange={(e) => { this.props.onShowWeightChange(e, this.props.index); }}
          />
        </View>
        <View style={styles.actions}>
          <TouchableHighlight
            onPress={this._removePress.bind(this)}
            style={styles.removeButtonTouch}
            underlayColor="#ffffff">
            <Text style={styles.actionButtonText}>Remove</Text>
          </TouchableHighlight>
          {moveUpButton}
          {moveDownButton}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row'
  },
  actionButtonText: {
    color: '#ffffff',
    fontFamily: 'Optima',
    fontSize: 10
  },
  error: {
    fontFamily: 'Optima',
    marginTop: 5,
    marginBottom: 5,
    color: 'red',
    flex: 1
  },

  moveButtonTouch: {
    alignSelf: 'flex-start',
    backgroundColor: '#555',
    borderRadius: 5,
    marginTop: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginRight: 5
  },

  removeButtonTouch: {
    alignSelf: 'flex-start',
    backgroundColor: '#BB4949',
    borderRadius: 5,
    marginTop: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginRight: 5
  },
  showWeight: {
    flexDirection: 'row',
    margin: 5
  },
  showWeightText: {
    fontFamily: 'Optima',
    marginRight: 5,
    paddingTop: 10
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E57F7F',
    flex: 1,
    fontFamily: 'Optima',
    height: 30,
    padding: 5,
    marginTop: 5
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#666666'
  }
});

export default ExerciseForm;

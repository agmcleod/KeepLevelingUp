'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} = React;

var styles = StyleSheet.create({
  error: {
    marginTop: 5,
    marginBottom: 5,
    color: 'red',
    flex: 1
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E57F7F',
    flex: 1,
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

class ExerciseForm extends Component {
  _outputErrorForField(field) {
    var exercise = this.props.exercise;
    if (exercise && exercise.errors && exercise.errors[field]) {
      return (
        <Text style={styles.error}>{exercise.errors[field].join(', ')}</Text>
      );
    }
  }
  render() {
    return (
      <View style={styles.view}>
        <TextInput style={styles.textInput} onChange={(e) => { this.props._onTextInputChange(e, this.props.index, "name"); }} placeholder="Name" />
        {this._outputErrorForField('name')}
        <TextInput style={styles.textInput} onChange={(e) => { this.props._onNumberInputChange(e, this.props.index, "sets"); }} placeholder="Sets" keyboardType="number-pad" />
        <TextInput style={styles.textInput} onChange={(e) => { this.props._onNumberInputChange(e, this.props.index, "weight"); }} placeholder="Weight" keyboardType="decimal-pad" />
        <TextInput style={styles.textInput} onChange={(e) => { this.props._onNumberInputChange(e, this.props.index, "reps"); }} placeholder="Reps" keyboardType="number-pad" />
        <TextInput style={styles.textInput} onChange={(e) => { this.props._onNumberInputChange(e, this.props.index, "duration"); }} placeholder="Duration in Seconds" keyboardType="decimal-pad" />
      </View>
    );
  }
}

export default ExerciseForm;

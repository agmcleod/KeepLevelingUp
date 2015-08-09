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
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      sets: null,
      weight: null,
      reps: null,
      duration: null
    };
  }
  render() {
    return (
      <View style={styles.view}>
        <TextInput style={styles.textInput} placeholder="Name" />
        <TextInput style={styles.textInput} placeholder="Sets" keyboardType="number-pad" />
        <TextInput style={styles.textInput} placeholder="Weight" keyboardType="decimal-pad" />
        <TextInput style={styles.textInput} placeholder="Reps" keyboardType="number-pad" />
        <TextInput style={styles.textInput} placeholder="Duration in Seconds" keyboardType="decimal-pad" />
      </View>
    );
  }
}

export default ExerciseForm;

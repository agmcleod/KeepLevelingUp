import React from 'react-native';

const {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} = React;

const styles = StyleSheet.create({
  exerciseInput: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#555',
    fontFamily: 'Optima',
    height: 40,
    width: 150,
    padding: 5
  },
  exerciseRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginBottom: 5
  },
  exerciseText: {
    alignSelf: 'stretch',
    color: '#555',
    fontFamily: 'Optima',
    marginRight: 10,
    fontSize: 16,
    paddingTop: 10,
    textAlign: 'left',
    width: 70,
  },
  note: {
    color: '#555',
    fontFamily: 'Optima',
    fontSize: 13,
    margin: 10
  }
});

class ExerciseField extends Component {
  static displayName = 'ExerciseField';
  static propTypes = {
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    noteValue: React.PropTypes.oneOf([React.PropTypes.string, React.PropTypes.number]),
    value: React.PropTypes.oneOf([React.PropTypes.string, React.PropTypes.number])
  };
  render() {
    return (
      <View style={styles.exerciseRow}>
        <Text style={styles.exerciseText}>{this.props.label}:</Text>
        <TextInput onChange={this.props.onChange} defaultValue={`${this.props.value}`} style={styles.exerciseInput} keyboardType='decimal-pad' />
        {typeof this.props.noteValue !== 'undefined' ? <Text style={styles.note}>({this.props.noteValue})</Text> : null}
      </View>
    );
  }
}

export default ExerciseField;

import React from 'react';
import {connect} from 'react-redux';

import {
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';

import BottomBar from '../components/bottom_bar';
import {saveDays, createDay} from './day_actions';

const styles = StyleSheet.create({
  formView: {
    flex: 10
  },
  label: {
    fontFamily: 'Optima',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 35,
    marginLeft: 15,
    marginBottom: 30
  },
  picker: {
    backgroundColor: '#eaeaea',
    fontFamily: 'Optima'
  },
  view: {
    flex: 1,
    flexDirection: 'column'
  }
});

class NewDay extends React.Component {
  static displayName = 'NewDay';
  static propTypes = {
    createDay: React.PropTypes.func.isRequired,
    navigator: React.PropTypes.object.isRequired,
    routines: React.PropTypes.object.isRequired,
    saveDays: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedUUID: null
    };
  }

  _cancelPressEvent() {
    this.props.navigator.pop();
  }

  _getOptionList() {
    return this.refs[OPTIONLIST_REF];
  }

  _goPressEvent() {
    if (this.state.selectedUUID) {
      this.props.createDay(this.state.selectedUUID);
      this.props.saveDays();
      this.props.navigator.pop();
    }
  }

  _selectRoutineEvent(uuid) {
    this.setState({
      selectedUUID: uuid
    });
  }

  render() {
    const buttons = [{
      text: 'Cancel',
      onPressEvent: this._cancelPressEvent.bind(this)
    }, {
      text: 'Go',
      onPressEvent: this._goPressEvent.bind(this)
    }];
    return (
      <View style={styles.view}>
        <View style={styles.formView}>
          <Text style={styles.label}>Select which routine:</Text>
          <Picker
            selectedValue={this.state.language}
            onValueChange={this._selectRoutineEvent.bind(this)}>
            {Object.keys(this.props.routines).map((key) => {
              const routine = this.props.routines[key];
              return <Picker.Item label={routine.name} key={routine.uuid} value={routine.uuid} />;
            })}
          </Picker>
        </View>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default connect((state) => {
  return {
    routines: state.routines
  };
}, {
  createDay, saveDays
})(NewDay);

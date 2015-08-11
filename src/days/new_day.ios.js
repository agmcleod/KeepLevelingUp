'use strict';

import React from 'react-native';

var {
  Component,
  PickerIOS,
  PickerItemIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

import BottomBar from '../components/bottom_bar.ios';
import RoutineActions from '../routines/routine_actions';
import RoutineStore from '../routines/routine_store';

import DayActions from './day_actions';
import DayStore from './day_store';

import DayForm from './day_form.ios';

var styles = StyleSheet.create({
  formView: {
    flex: 10
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 35,
    marginLeft: 15,
    marginBottom: 30
  },
  picker: {
    backgroundColor: '#eaeaea'
  },
  view: {
    flex: 1,
    flexDirection: 'column'
  }
});

class NewDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routines: {},
      selectedUUID: null
    };
  }
  componentDidMount() {
    this._subscription = RoutineStore.listen(this._onRoutinesChange.bind(this));
    this._dayCreationSub = DayStore.listen(this._onDayCreation.bind(this));
    RoutineActions.listRoutines();
  }

  componentWillUnMount() {
    this._subscription();
    this._dayCreationSub();
  }

  _cancelPressEvent() {
    this.props.navigator.pop();
    this.props.parentListen();
  }

  _goPressEvent() {
    console.log(this.state.selectedUUID);
    if (this.state.selectedUUID) {
      DayActions.createDay({ routine_uuid: this.state.selectedUUID });
    }
  }

  _onDayCreation(day) {
    this.props.navigator.replace({
      component: DayForm,
      props: { day: day }
    });
  }

  _onRoutinesChange(routines) {
    if (routines) {
      this.setState({
        routines: routines,
        selectedUUID: Object.keys(routines)[0]
      });
    }
  }

  _selectRoutineEvent(uuid) {
    this.setState({
      selectedUUID: uuid
    });
  }

  render() {
    var buttons = [{
      text: "Cancel",
      onPressEvent: this._cancelPressEvent.bind(this)
    }, {
      text: "Go",
      onPressEvent: this._goPressEvent.bind(this)
    }];
    return (
      <View style={styles.view}>
        <View style={styles.formView}>
          <Text style={styles.label}>Select which routine:</Text>
          <PickerIOS style={styles.picker} onValueChange={this._selectRoutineEvent.bind(this)}>
            {Object.keys(this.state.routines).map((key) => {
              let routine = this.state.routines[key];
              return (<PickerItemIOS
                key={routine.uuid}
                value={routine.uuid}
                label={routine.name}
              />);
            })}
          </PickerIOS>
        </View>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default NewDay;

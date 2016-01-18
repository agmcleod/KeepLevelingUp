'use strict';

import React from 'react-native';

import {Select, Option, OptionList, updatePosition} from 'react-native-dropdown';

var {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

import BottomBar from '../components/bottom_bar';
import RoutineActions from '../routines/routine_actions';
import RoutineStore from '../routines/routine_store';

import DayActions from './day_actions';
import DayStore from './day_store';

import EditDay from './edit_day';

const OPTIONLIST_REF = 'optionlist';

var styles = StyleSheet.create({
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

    updatePosition(this.refs['select']);
    updatePosition(this.refs[OPTIONLIST_REF]);
  }

  _cancelPressEvent() {
    this._subscription();
    this._dayCreationSub();
    this.props.parentListen();
    this.props.navigator.pop();
  }

  _getOptionList() {
    return this.refs[OPTIONLIST_REF];
  }

  _goPressEvent() {
    if (this.state.selectedUUID) {
      DayActions.createDay({ routine_uuid: this.state.selectedUUID });
    }
  }

  _onDayCreation(day) {
    this._subscription();
    this._dayCreationSub();
    this.props.navigator.replace({
      component: EditDay,
      props: { day: day, parentListen: this.props.parentListen }
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
          <Select
            defaultValue='Select which routine'
            onSelect={this._selectRoutineEvent.bind(this)}
            optionListRef={this._getOptionList.bind(this)}
            ref='select'>
            {Object.keys(this.state.routines).map((key) => {
              let routine = this.state.routines[key];
              return <Option key={key} value={routine.uuid}>{routine.name}</Option>;
            })}
          </Select>
          <OptionList ref={OPTIONLIST_REF} />
        </View>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default NewDay;

import React from 'react-native';
import {connect} from 'react-redux';

import {Select, Option, OptionList, updatePosition} from 'react-native-dropdown';

const {
  Component,
  StyleSheet,
  Text,
  View
} = React;

import BottomBar from '../components/bottom_bar';
import * as DayActions from './day_actions';
import EditDay from './edit_day';

const OPTIONLIST_REF = 'optionlist';

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

class NewDay extends Component {
  static displayName = 'NewDay';
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    routines: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedUUID: null
    };
  }

  componentDidMount() {
    updatePosition(this.refs.select);
    updatePosition(this.refs[OPTIONLIST_REF]);
  }

  _cancelPressEvent() {
    this.props.navigator.pop();
  }

  _getOptionList() {
    return this.refs[OPTIONLIST_REF];
  }

  _goPressEvent() {
    if (this.state.selectedUUID) {
      DayActions.createDay(this.state.selectedUUID);
    }
  }

  _onDayCreation(day) {
    this.props.navigator.replace({
      component: EditDay,
      props: {day: day}
    });
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
          <Select
            defaultValue='Select which routine'
            onSelect={this._selectRoutineEvent.bind(this)}
            optionListRef={this._getOptionList.bind(this)}
            ref='select'>
            {Object.keys(this.props.routines).map((key) => {
              const routine = this.props.routines[key];
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

export default connect((state) => {
  return {
    routines: state.routines
  };
})(NewDay);

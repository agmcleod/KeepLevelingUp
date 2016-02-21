import React from 'react-native';
import {connect} from 'react-redux';

const {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  View
} = React;

import BottomBar from '../components/bottom_bar';
import Exercise from './exercise';

import {saveDays, updateDay} from './day_actions';
import friendlyDay from '../friendly_day.js';

const styles = StyleSheet.create({
  dayContainer: {
    margin: 20
  },
  dayHeader: {
    color: '#000',
    fontFamily: 'Optima',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30
  },
  scrollView: {
    flex: 10
  },
  view: {
    flex: 1
  }
});

class EditDay extends Component {
  static displayName = 'EditDay';
  static propTypes = {
    day: React.PropTypes.shape({
      created_at: React.PropTypes.string,
      exercises: React.PropTypes.array
    }).isRequired,
    navigator: React.PropTypes.object.isRequired,
    saveDays: React.PropTypes.func.isRequired,
    updateDay: React.PropTypes.func.isRequired
  };

  _onDayUpdate() {
    this.props.navigator.pop();
  }

  _onSavePressEvent() {
    this.props.updateDay(this.props.day);
    this.props.saveDays();
    this.props.navigator.pop();
  }

  render() {
    const buttons = [{
      text: "Save",
      onPressEvent: this._onSavePressEvent.bind(this)
    }];
    return (
      <View style={styles.view}>
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps={false}>
          <View style={styles.dayContainer}>
            <Text style={styles.dayHeader}>{friendlyDay(this.props.day.created_at)}</Text>
            {this.props.day.exercises.map((exercise) => <Exercise key={exercise.uuid} exercise={exercise} />)}
          </View>
        </ScrollView>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default connect(() => {
  return {};
}, {
  saveDays, updateDay
})(EditDay);

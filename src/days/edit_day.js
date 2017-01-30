import React from 'react';
import {connect} from 'react-redux';

import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

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
  view: {
    flex: 1
  }
});

class EditDay extends React.Component {
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
    const {day} = this.props;
    const screen = Dimensions.get('window');
    return (
      <View style={styles.view}>
        <ScrollView
          style={[{ width: screen.width, height: screen.height * 0.8 }]}
          keyboardShouldPersistTaps='never'>
          <View style={styles.dayContainer}>
            <Text style={styles.dayHeader}>{friendlyDay(day.created_at)}</Text>
            {this.props.day.exercises.map((exercise) => {
              return <Exercise key={exercise.uuid} dayUuid={day.uuid} exerciseUuid={exercise.uuid} />;
            })}
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

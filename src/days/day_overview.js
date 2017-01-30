import React from 'react';
import {connect} from 'react-redux';

import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import {deleteDay, saveDays, viewDay} from './day_actions';
import EditDay from './edit_day';
import friendlyDay from '../friendly_day';
import ExerciseValue from './exercise_value';

const styles = StyleSheet.create({
  dayActions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dayHeader: {
    color: '#000',
    fontFamily: 'Optima',
    fontSize: 18,
    fontWeight: 'bold'
  },
  daySection: {
    padding: 20
  },
  deleteDayTouch: {
    alignSelf: 'flex-start',
    backgroundColor: '#BB4949',
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginTop: 20
  },
  deleteDayText: {
    color: '#fff',
    fontFamily: 'Optima',
    fontSize: 16
  },
  editDayText: {
    color: '#fff',
    fontFamily: 'Optima',
    fontSize: 16
  },
  editDayTouch: {
    alignSelf: 'flex-start',
    backgroundColor: '#39b54a',
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginTop: 20
  }
});

class DayOverview extends React.Component {
  static displayName = 'DayOverview';
  static propTypes = {
    day: React.PropTypes.shape({
      uuid: React.PropTypes.string,
      created_at: React.PropTypes.string,
      exercises: React.PropTypes.array
    }).isRequired,
    deleteDay: React.PropTypes.func.isRequired,
    navigator: React.PropTypes.object,
    saveDays: React.PropTypes.func.isRequired,
    viewDay: React.PropTypes.func.isRequired
  };

  _deleteDayPressEvent() {
    this.props.deleteDay(this.props.day.uuid);
    this.props.saveDays();
  }

  _editDayPressEvent() {
    this.props.navigator.push({
      component: EditDay,
      props: {day: this.props.day}
    });
  }

  render() {
    const screen = Dimensions.get('window');
    const day = this.props.day;
    return (
      <ScrollView key={day.uuid}
        style={[{width: screen.width, height: screen.height * 0.7}, styles.daySection]}
        pagingEnabled={false}>
        <Text style={styles.dayHeader}>{friendlyDay(day.created_at)}</Text>
        <View style={styles.dayActions}>
          <TouchableHighlight
            style={styles.editDayTouch}
            underlayColor='#C0FAC4'
            onPress={this._editDayPressEvent.bind(this)}>
            <Text style={styles.editDayText}>Edit</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.deleteDayTouch}
            underlayColor='#ff8888'
            onPress={this._deleteDayPressEvent.bind(this)}>
            <Text style={styles.deleteDayText}>Delete</Text>
          </TouchableHighlight>
        </View>
        {day.exercises.map((ex, i) => <ExerciseValue key={`exercise_value_${i}`} exercise={ex} />)}
      </ScrollView>
    );
  }
}

export default connect(() => {
  return {};
}, {
  deleteDay, saveDays, viewDay
})(DayOverview);

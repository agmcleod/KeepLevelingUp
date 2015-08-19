'use strict';

import React from 'react-native';

var {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

import ViewDay from './view_day.ios';
import friendlyDay from '../friendly_day';

var styles = StyleSheet.create({
  counter: {
    color: '#555',
    width: 20
  },
  dayHeader: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  daySection: {
    padding: 20
  },
  editDayText: {
    color: '#ffffff'
  },
  editDayTouch: {
    alignSelf: 'flex-start',
    backgroundColor: '#6DE375',
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginTop: 20
  },

  exerciseName: {
    fontSize: 14,
    marginTop: 5
  },

  exerciseWrapper: {
    marginTop: 10
  },

  setDetails: {
    color: '#555'
  },

  setWrapper: {
    flexDirection: 'row'
  },

  setsWrapper: {
    marginTop: 10,
    paddingLeft: 10
  }
});

class ExerciseValue extends Component {
  render() {
    return (
      <View style={styles.exerciseWrapper}>
        <Text style={styles.exerciseName}>{this.props.exercise.name}</Text>
        <View style={styles.setsWrapper}>
          {this.props.exercise.sets.map((set, i) => {
            var setString = "";
            if (typeof set.reps === "number") {
              setString += set.reps;
            }
            if (typeof set.weight === "number") {
              if (setString !== "") {
                setString += " x ";
              }
              setString += (set.weight) + "lbs ";
            }
            if (typeof set.duration === "number") {
              setString += (set.duration);
            }
            return (
              <View style={styles.setWrapper}>
                <Text style={styles.counter}>{i + 1}.</Text>
                <Text style={styles.setDetails}>{setString}</Text>
              </View>
            )
          })}
        </View>
      </View>
    );
  }
}

class DayListItem extends Component {
  _editDayPressEvent() {
    this._unlisten();
    this.props.navigator.push({
      component: ViewDay,
      props: { parentListen: this.props.parentListen, day: this.props.day }
    });
  }

  render() {
    var screen = Dimensions.get("window");
    var day = this.props.day;
    return (
      <View key={day.uuid} style={[{width: screen.width}, styles.daySection]}>
        <Text style={styles.dayHeader}>{friendlyDay(day.created_at)}</Text>
        <TouchableHighlight style={styles.editDayTouch} underlayColor='#C0FAC4' onPress={this._editDayPressEvent.bind(this)}>
          <Text style={styles.editDayText}>Edit</Text>
        </TouchableHighlight>
        {day.exercises.map((ex, i) => {
          return (
            <ExerciseValue key={"exercise_value_" + i} exercise={ex} />
          );
        })}
      </View>
    );
  }
}

export default DayListItem;

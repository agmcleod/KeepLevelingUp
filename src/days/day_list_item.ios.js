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

var styles = StyleSheet.create({
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
    fontSize: 14
  },

  setDetails: {
    color: '#555'
  }
});

class ExerciseValue extends Component {
  render() {
    return (
      <View>
        <Text style={styles.exerciseName}>{this.props.exercise.name}</Text>
        {this.props.exercise.sets.forEach((set, i) => {
          var setString = "";
          if (typeof set.reps === "number") {
            setString = "12 x ";
          }
          if (typeof set.weight === "number") {
            setString += (set.weight) + "lbs ";
          }
          if (typeof set.duration === "number") {
            setString += (set.duration);
          }
          return (
            <Text style={styles.setDetails}>{setString}</Text>
          )
        })}
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
    return (
      <View key={uuid} style={[{width: screen.width}, styles.daySection]}>
        <Text style={styles.dayHeader}>{day.created_at}</Text>
        <TouchableHighlight style={styles.editDayTouch} underlayColor='#C0FAC4' onPress={this._editDayPressEvent.bind(this)}>
          <Text style={styles.editDayText}>Edit</Text>
        </TouchableHighlight>
        {day.exercises.map((ex) => {
          return (
            <ExerciseValue exercise={ex} />
          );
        })}
      </View>
    );
  }
}

export default DayListItem;

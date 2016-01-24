import React from 'react-native';

const {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  View
} = React;

import BottomBar from '../components/bottom_bar';
import Exercise from './exercise';

import DayStore from './day_store';
import DayActions from './day_actions';
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
    parentListen: React.PropTypes.func.isRequired
  };
  componentDidMount() {
    this._listen();
  }

  componentWillUnmount() {
    this.props.parentListen();
    this._unlisten();
  }

  _listen() {
    this._subscription = DayStore.listen(this._onDayUpdate.bind(this));
  }

  _onDayUpdate() {
    this.props.navigator.pop();
  }

  _onSavePressEvent() {
    DayActions.updateDay(this.props.day);
  }

  _unlisten() {
    this._subscription();
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

export default EditDay;

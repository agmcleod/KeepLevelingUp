'use strict';

var React = require('react-native');

var {
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

import RoutineList from '../routines/routine_list.ios';
import BottomBar from '../components/bottom_bar.ios';
import NewDay from './new_day.ios';

import DayActions from './day_actions';
import DayStore from './day_store';
import DayListItem from './day_list_item.ios';

import RoutineActions from '../routines/routine_actions';
import RoutineStore from '../routines/routine_store';

var styles = StyleSheet.create({
  actionText: {
    fontSize: 18,
    margin: 20,
    marginTop: 100,
    textAlign: 'center'
  },
  dayHeader: {
    fontSize: 18,
    marginBottom: 5
  },
  noRoutinesView: {
    flex: 10
  },
  scrollView: {
    flex: 10,
  },
  pageControl: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  }
});

class DayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: {},
      hasRoutines: false
    };
  }

  componentDidMount() {
    this._listen();
  }

  componentWillUnmount() {
    this._unlisten();
  }

  _editDayPressEvent(day) {
    this._unlisten();
    this.props.navigator.push({
      component: ViewDay,
      props: { parentListen: this.props.parentListen, day: this.props.day }
    });
  }

  _listen() {
    this._subscription = DayStore.listen(this._onDayListChange.bind(this));
    this._routineSubscription = RoutineStore.listen(this._onRoutinesChange.bind(this));

    DayActions.listDays();
    RoutineActions.listRoutines();
  }

  _newDayPressEvent() {
    this._unlisten();
    this.props.navigator.push({
      component: NewDay,
      props: { parentListen: this._listen.bind(this) },
      type: "right"
    });
  }

  _onDayListChange(days) {
    if (days) {
      this.setState({ days: days });
    }
  }

  _onRoutinesChange(routines) {
    this.setState({
      hasRoutines: (Object.keys(routines).length > 0)
    });
  }

  _routinesPressEvent() {
    this._unlisten();
    this.props.navigator.push({
      component: RoutineList,
      props: { parentListen: this._listen.bind(this) },
      type: "left"
    });
  }

  _unlisten() {
    this._subscription();
    this._routineSubscription();
  }

  render() {
    if (!this.state.hasRoutines) {
      return this.renderNoRoutines();
    }
    else {
      var buttons = [{ text: "Routines", onPressEvent: this._routinesPressEvent.bind(this) }, { text: "New Day", onPressEvent: this._newDayPressEvent.bind(this) }];
      if (Object.keys(this.state.days).length === 0) {
        return this.renderNoDays(buttons);
      }
      else {
        var screen = Dimensions.get("window");
        return (
          <View style={styles.view}>
            <ScrollView style={[{width: screen.width}, styles.scrollView]} horizontal={true} bounces={false} showsHorizontalScrollIndicator={true} pagingEnabled={true}>
              {Object.keys(this.state.days).map((uuid) => {
                let day = this.state.days[uuid];
                return (<DayListItem day={day} navigator={this.props.navigator} parentListen={this._listen.bind(this)} />);
              })}
            </ScrollView>
            <BottomBar buttons={buttons} />
          </View>
        );
      }
    }
  }

  renderNoDays(buttons) {
    return (
      <View style={styles.view}>
        <View style={styles.noRoutinesView} horizontal={true} bounces={false} showsHorizontalScrollIndicator={true} pagingEnabled={true}>
          <Text style={styles.actionText}>{"You haven't entered a work out day yet. Start one!"}</Text>
        </View>
        <BottomBar buttons={buttons} />
      </View>
    );
  }

  renderNoRoutines() {
    var buttons = [{ text: "Routines", onPressEvent: this._routinesPressEvent.bind(this) }];
    return (
      <View style={styles.view}>
        <View style={styles.noRoutinesView}>
          <Text style={styles.actionText}>Create a routine to get started.</Text>
        </View>
        <BottomBar buttons={buttons} />
      </View>
    )
  }
}

export default DayList;

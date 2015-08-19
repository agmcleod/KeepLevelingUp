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
import ViewDay from './view_day.ios';

import DayActions from './day_actions';
import DayStore from './day_store';

import RoutineActions from '../routines/routine_actions';
import RoutineStore from '../routines/routine_store';

var styles = StyleSheet.create({
  actionText: {
    fontSize: 18,
    margin: 20,
    marginTop: 100,
    textAlign: 'center'
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
      props: { parentListen: this._listen.bind(this), day: day }
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
      props: { parentListen: this._listen.bind(this) }
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
      props: { parentListen: this._listen.bind(this) }
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
                return (
                  <View key={uuid} style={[{width: screen.width}, styles.daySection]}>
                    <Text>{day.created_at}</Text>
                    <TouchableHighlight style={styles.editDayTouch} underlayColor='#C0FAC4' onPress={() => { this._editDayPressEvent(day) }}>
                      <Text style={styles.editDayText}>Edit</Text>
                    </TouchableHighlight>
                  </View>
                );
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

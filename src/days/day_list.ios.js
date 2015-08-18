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
      days: {}
    };
  }

  componentDidMount() {
    this._listen();
    DayActions.listDays();
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
  }

  _onDayListChange(days) {
    if (days) {
      this.setState({ days: days });
    }
  }

  _newDayPressEvent() {
    this._unlisten();
    this.props.navigator.push({
      component: NewDay,
      props: { parentListen: this._listen.bind(this) }
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
  }

  render() {
    var screen = Dimensions.get("window");
    var buttons = [{ text: "Routines", onPressEvent: this._routinesPressEvent.bind(this) }, { text: "New Day", onPressEvent: this._newDayPressEvent.bind(this) }];
    return (
      <View style={styles.view}>
        <ScrollView style={[{width: screen.width}, styles.scrollView]} horizontal={true} bounces={false} showsHorizontalScrollIndicator={true} pagingEnabled={true}>
          {Object.keys(this.state.days).map((uuid) => {
            let day = this.state.days[uuid];
            return (
              <View style={[{width: screen.width}, styles.daySection]}>
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

export default DayList;

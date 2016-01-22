import React from 'react-native';

const {
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

import RoutineList from '../routines/routine_list';
import BottomBar from '../components/bottom_bar';
import NewDay from './new_day';

import DayActions from './day_actions';
import DayNavItem from './day_nav_item';
import DayStore from './day_store';
import DayOverview from './day_overview';

import RoutineActions from '../routines/routine_actions';
import RoutineStore from '../routines/routine_store';

const styles = StyleSheet.create({
  actionText: {
    fontFamily: 'Optima',
    fontSize: 18,
    margin: 20,
    marginTop: 100,
    textAlign: 'center'
  },
  nav: {
    padding: 0,
    marginTop: 30,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#000000'
  },
  noRoutinesView: {
    flex: 10
  },
  pageControl: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10
  },
  titleText: {
    color: '#555',
    fontFamily: 'Optima',
    fontSize: 18,
    marginTop: 30
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  }
});

class DayList extends Component {
  static displayName = 'DayList';
  static propTypes = {
    navigator: React.PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      days: new Map(),
      hasRoutines: false
    };
  }

  componentDidMount() {
    this._listen();
  }

  componentWillUnmount() {
    this._unlisten();
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
      props: {parentListen: this._listen.bind(this)},
      type: 'right'
    });
  }

  _onDayListChange(daysDataSet) {
    if (daysDataSet) {
      const dayUuids = Object.keys(daysDataSet);
      dayUuids.reverse();
      const days = this.state.days;
      days.clear();
      for (let i = 0; i < dayUuids.length; i++) {
        const uuid = dayUuids[i];
        days.set(uuid, daysDataSet[uuid]);
      }
      this.setState({days: days, viewingDay: days.get(dayUuids[0])});
    }
  }

  _onRoutinesChange(routines) {
    this.setState({
      hasRoutines: (Object.keys(routines).length > 0)
    });
  }

  _selectDay(uuid) {
    this.setState({
      viewingDay: this.state.days.get(uuid)
    });
  }

  _routinesPressEvent() {
    this._unlisten();
    this.props.navigator.push({
      component: RoutineList,
      props: { parentListen: this._listen.bind(this) },
      type: 'left'
    });
  }

  _unlisten() {
    this._subscription();
    this._routineSubscription();
  }

  render() {
    if (!this.state.hasRoutines) {
      return this.renderNoRoutines();
    } else {
      const buttons = [
        {text: 'Routines', onPressEvent: this._routinesPressEvent.bind(this)},
        {text: 'New Day', onPressEvent: this._newDayPressEvent.bind(this)}
      ];
      if (this.state.days.size === 0) {
        return this.renderNoDays(buttons);
      } else {
        const screen = Dimensions.get('window');
        const viewingDay = this.state.viewingDay;
        let i = 0;
        const dayNavItems = [];
        this.state.days.forEach((day, uuid) => {
          const odd = i % 2 === 0 ? false : true;
          i += 1;
          dayNavItems.push(
            (
              <DayNavItem
                key={uuid}
                day={day}
                odd={odd}
                selected={uuid === this.state.viewingDay.uuid}
                selectDay={this._selectDay.bind(this)} />
            )
          );
        });
        return (
          <View style={styles.view}>
            <ScrollView
              style={[{width: screen.width}, styles.nav]}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              automaticallyAdjustContentInsets={false}>
              {dayNavItems}
            </ScrollView>
            <DayOverview
              day={viewingDay}
              navigator={this.props.navigator}
              parentListen={this._listen.bind(this)}
              parentUnlisten={this._unlisten.bind(this)} />
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
          <Text style={styles.actionText}>{'You haven\'t entered a work out day yet. Start one!'}</Text>
        </View>
        <BottomBar buttons={buttons} />
      </View>
    );
  }

  renderNoRoutines() {
    const buttons = [{text: 'Routines', onPressEvent: this._routinesPressEvent.bind(this)}];
    return (
      <View style={styles.view}>
        <View style={styles.noRoutinesView}>
          <Text style={styles.actionText}>Create a routine to get started.</Text>
        </View>
        <BottomBar buttons={buttons} />
      </View>
    );
  }
}

export default DayList;

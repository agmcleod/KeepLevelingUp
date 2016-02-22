import React from 'react-native';

const {
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} = React;

import RoutineList from '../routines/routine_list';
import BottomBar from '../components/bottom_bar';
import NewDay from './new_day';

import {listDays, viewDay} from './day_actions';
import DayNavItem from './day_nav_item';
import DayOverview from './day_overview';

import {listRoutines} from '../routines/routine_actions';
import {connect} from 'react-redux';

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
    flex: 0.8,
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
    days: React.PropTypes.object.isRequired,
    hasRoutines: React.PropTypes.bool,
    listDays: React.PropTypes.func,
    listRoutines: React.PropTypes.func,
    navigator: React.PropTypes.object.isRequired,
    viewDay: React.PropTypes.func.isRequired,
    viewingDayUuid: React.PropTypes.string
  };

  componentDidMount() {
    this.props.listDays();
    this.props.listRoutines();
  }

  _newDayPressEvent() {
    this.props.navigator.push({
      component: NewDay,
      type: 'right'
    });
  }

  _selectDay(uuid) {
    this.props.viewDay(uuid);
  }

  _routinesPressEvent() {
    this.props.navigator.push({
      component: RoutineList,
      type: 'left'
    });
  }

  renderNoDays(buttons) {
    return (
      <View style={styles.view}>
        <View
          style={styles.noRoutinesView}
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={true}
          pagingEnabled={true}>
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

  render() {
    if (!this.props.hasRoutines) {
      return this.renderNoRoutines();
    } else {
      const buttons = [
        {text: 'Routines', onPressEvent: this._routinesPressEvent.bind(this)},
        {text: 'New Day', onPressEvent: this._newDayPressEvent.bind(this)}
      ];
      if (this.props.days.size === 0) {
        return this.renderNoDays(buttons);
      } else {
        const screen = Dimensions.get('window');
        const viewingDay = this.props.days.get(this.props.viewingDayUuid);
        let i = 0;
        const dayNavItems = [];
        this.props.days.forEach((day, uuid) => {
          const odd = i % 2 !== 0;
          i += 1;
          dayNavItems.push((
            <DayNavItem
              key={uuid}
              day={day}
              odd={odd}
              selected={uuid === this.props.viewingDayUuid}
              selectDay={this._selectDay.bind(this)} />));
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
              navigator={this.props.navigator} />
            <BottomBar buttons={buttons} />
          </View>
        );
      }
    }
  }
}

export default connect((state) => {
  const days = [];
  for (const uuid in state.days) {
    if (state.days.hasOwnProperty(uuid)) {
      days.push(state.days[uuid]);
    }
  }
  days.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  const daysMap = new Map();
  for (let i = 0; i < days.length; i++) {
    daysMap.set(days[i].uuid, days[i]);
  }
  return {
    days: daysMap,
    hasRoutines: Object.keys(state.routines).length > 0,
    viewingDayUuid: state.viewingDayUuid || days[0] && days[0].uuid
  };
}, {
  listDays, listRoutines, viewDay
})(DayList);

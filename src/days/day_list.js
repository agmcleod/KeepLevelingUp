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

import {listDays} from './day_actions';
import DayNavItem from './day_nav_item';
import DayOverview from './day_overview';

import {listRoutines} from '../routines/routine_actions';
import {connect} from 'react-redux/native';

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
    navigator: React.PropTypes.object.isRequired,
    viewingDayUuid: React.PropTypes.string.uuid
  };

  _newDayPressEvent() {
    this.props.navigator.push({
      component: NewDay,
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
      if (Object.keys(this.props.days).length === 0) {
        return this.renderNoDays(buttons);
      } else {
        const screen = Dimensions.get('window');
        const viewingDay = this.props.days[this.props.viewingDayUuid];
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
  return {
    days: state.days,
    hasRoutines: Object.keys(state.routines).length > 0,
    viewingDayUuid: state.viewingDayUuid || Object.keys(state.days)[0]
  };
}, {
  listDays, listRoutines
})(DayList);

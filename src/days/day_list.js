import React from 'react';
import _ from 'lodash';

import {
  Dimensions,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

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

class DayList extends React.Component {
  static displayName = 'DayList';
  static propTypes = {
    days: React.PropTypes.array.isRequired,
    hasRoutines: React.PropTypes.bool,
    listDays: React.PropTypes.func,
    listRoutines: React.PropTypes.func,
    navigator: React.PropTypes.object.isRequired,
    viewDay: React.PropTypes.func.isRequired,
    viewingDayUuid: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.days)
    };
  }

  componentDidMount() {
    this.props.listDays();
    this.props.listRoutines();
  }

  componentWillReceiveProps(newProps) {
    let days = newProps.days;
    if (newProps.viewingDayUuid !== this.props.viewingDayUuid) {
      days = days.map((day) => {
        if (day.uuid === newProps.viewingDayUuid || day.uuid === this.props.viewingDayUuid) {
          return Object.assign({}, day);
        } else {
          return day;
        }
      });
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(days)
    });
  }

  _daysAsArray() {
    return _.values(this.props.days);
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

  renderDayNavItem(day, sectionId, rowId) {
    return (
      <DayNavItem
        key={day.uuid}
        day={day}
        odd={parseFloat(rowId) % 2 !== 0}
        selected={day.uuid === this.props.viewingDayUuid}
        selectDay={this._selectDay.bind(this)} />
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
      if (this.props.days.length === 0) {
        return this.renderNoDays(buttons);
      } else {
        const screen = Dimensions.get('window');
        const viewingDay = _.find(this.props.days, { uuid: this.props.viewingDayUuid });
        return (
          <View style={styles.view}>
            <ListView
              style={[{width: screen.width}, styles.nav]}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              dataSource={this.state.dataSource}
              automaticallyAdjustContentInsets={false}
              renderRow={this.renderDayNavItem.bind(this)} />
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
  return {
    days: days,
    hasRoutines: Object.keys(state.routines).length > 0,
    viewingDayUuid: state.viewingDayUuid || days[0] && days[0].uuid
  };
}, {
  listDays, listRoutines, viewDay
})(DayList);

import React from 'react';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getMonth = function (date) {
  return MONTHS[date.getMonth()];
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    width: 60,
    height: 49
  },
  odd: {
    backgroundColor: '#ccc'
  },
  selected: {
    backgroundColor: '#39b54a'
  },
  text: {
    fontFamily: 'Optima',
    justifyContent: 'center'
  }
});

class DayNavItem extends React.Component {
  static displayName = 'DayNavItem';
  static propTypes = {
    day: React.PropTypes.object.isRequired,
    odd: React.PropTypes.bool,
    selectDay: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool
  };

  _onPress() {
    this.requestAnimationFrame(() => {
      this.props.selectDay(this.props.day.uuid);
    });
  }

  render() {
    const d = new Date(this.props.day.created_at);
    const viewStyles = [styles.container];
    if (this.props.selected) {
      viewStyles.push(styles.selected);
    } else if (this.props.odd) {
      viewStyles.push(styles.odd);
    }
    return (
      <TouchableOpacity style={viewStyles} onPress={this._onPress.bind(this)}>
        <View>
          <Text style={styles.text}>{getMonth(d)}</Text>
          <Text style={styles.text}>{d.getDate()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

reactMixin(DayNavItem.prototype, TimerMixin);

export default DayNavItem;

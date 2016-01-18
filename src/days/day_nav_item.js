import React from 'react-native';

const {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getMonth = function (date) {
  return MONTHS[date.getMonth()];
};

class DayNavItem extends React.Component {
  static propTypes = {
    day: React.PropTypes.object.isRequired,
    odd: React.PropTypes.bool,
    selectDay: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool
  };

  render() {
    const d = new Date(this.props.day.created_at);
    const viewStyles = [styles.container];
    if (this.props.selected) {
      viewStyles.push(styles.selected);
    } else if (this.props.odd) {
      viewStyles.push(styles.odd);
    }
    return (
      <TouchableOpacity style={viewStyles} onPress={() => this.props.selectDay(this.props.day.uuid)}>
        <View>
          <Text style={styles.text}>{getMonth(d)}</Text>
          <Text style={styles.text}>{d.getDate()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    width: 50,
    justifyContent: 'center'
  },
  odd: {
    backgroundColor: '#ccc'
  },
  selected: {
    backgroundColor: '#39b54a'
  },
  text: {
    fontFamily: 'Optima'
  }
});

export default DayNavItem;

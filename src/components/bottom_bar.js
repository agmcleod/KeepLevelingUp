'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

var styles = StyleSheet.create({
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Optima',
    fontSize: 18,
    paddingTop: 15,
    textAlign: 'center'
  },
  buttonTouch: {
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: '#E57F7F'
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  }
});


class BottomBar extends Component {
  render() {
    return (
      <View style={styles.buttonView}>
        {this.props.buttons.map((button, key) => {
          return (
            <TouchableOpacity key={"bottom_bar_" + key} style={styles.buttonTouch} onPress={button.onPressEvent}>
              <Text style={styles.buttonText}>{button.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default BottomBar;

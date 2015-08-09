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
    paddingTop: 15,
    textAlign: 'center',
    alignSelf: 'stretch',
    flex: 1,
    color: '#ffffff',
    backgroundColor: '#E57F7F'
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch'
  }
});


class BottomBar extends Component {
  render() {
    var buttons = [];
    this.props.buttons.map((button) => {
      return buttons.push(
        <TouchableOpacity onPress={button.onPressEvent}>
          <Text style={styles.buttonText}>{button.text}</Text>
        </TouchableOpacity>
      );
    });
    return (
      <View style={styles.buttonView}>
        {buttons}
      </View>
    );
  }
}

export default BottomBar;

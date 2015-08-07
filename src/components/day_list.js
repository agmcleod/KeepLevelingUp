'use strict';

var React = require('react-native');

var {
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var styles = StyleSheet.create({
  buttonText: {
    alignSelf: 'stretch',
    color: '#ffffff',
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center'
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  newButton: {
    flex: 1
  },
  newButtonText: {
    backgroundColor: '#E57F7F',
  },
  routinesButton: {
    flex: 1
  },
  routinesButtonText: {
    backgroundColor: '#7FE593',
  },
  scrollView: {
    flex: 7,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  }
});

class DayList extends Component {
  render() {
    var width = Dimensions.get("window").width;
    return (
      <View style={[{width: width}, styles.view]}>
        <ScrollView horizontal={true} style={styles.scrollView}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </ScrollView>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.routinesButton}>
            <Text style={[styles.buttonText, styles.routinesButtonText]}>Routines</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.newButton}>
            <Text style={[styles.buttonText, styles.newButtonText]}>New Day</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

module.exports = DayList;

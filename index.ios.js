/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Navigator
} = React;

var DayList = require('./src/components/day_list');

var KeepLevelingUp = React.createClass({
  _renderScene(route, navigator) {
    var Component = route.component;
    return (
      <Component {...route.props} navigator={navigator} route={route} />
    );
  },
  render() {
    return (
      <Navigator
        initialRoute={{
          component: DayList,
          id: "day_list"
        }}
        renderScene={this._renderScene}
      />
    );
  }
});

AppRegistry.registerComponent('KeepLevelingUp', () => KeepLevelingUp);
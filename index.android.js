/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
var {
  AppRegistry,
  Navigator,
} = React;

import DayList from './src/days/day_list.ios';
import NavConfig from './src/nav_config';

import './src/object.js';

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
        configureScene={(route) => NavConfig}
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
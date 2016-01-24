/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React from 'react-native';
const {
  AppRegistry,
  Navigator,
} = React;

import DayList from './src/days/day_list';
import NavConfig from './src/nav_config';

import './src/object.js';

const KeepLevelingUp = React.createClass({
  _renderScene(route, navigator) {
    const Component = route.component;
    return (
      <Component {...route.props} navigator={navigator} route={route} />
    );
  },
  render() {

    return (
      <Navigator
        configureScene={(route) => {
          if (route.type === "left") {
            return NavConfig.toLeft;
          }
          else {
            return NavConfig.toRight;
          }
        }}
        initialRoute={{
          component: DayList,
          type: "right"
        }}
        renderScene={this._renderScene}
      />
    );
  }
});

AppRegistry.registerComponent('YourRoutine', () => KeepLevelingUp);

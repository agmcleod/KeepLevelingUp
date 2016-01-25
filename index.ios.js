/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React from 'react-native';
import {Provider} from 'react-redux'
const {
  AppRegistry,
  Navigator,
  Text
} = React;

import DayList from './src/days/day_list';
import NavConfig from './src/nav_config';

import './src/object.js';

import createStore from './src/create_store';
const store = createStore({
  routines: {}, days: {}
});

const KeepLevelingUp = React.createClass({
  _renderScene(route, navigator) {
    const Component = route.component;
    return (
      <Component {...route.props} navigator={navigator} route={route} />
    );
  },
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
});

AppRegistry.registerComponent('YourRoutine', () => KeepLevelingUp);

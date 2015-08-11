'use strict';

var React = require('react-native');

var {
  Component,
  Dimensions,
  ListView,
  StyleSheet,
  Text,
  View
} = React;

import BottomBar from './bottom_bar.ios';
import RoutineActions from '../routines/routine_actions';
import RoutineStore from '../routines/routine_store';
import NewRoutine from './new_routine.ios';

import Swipeout from 'react-native-swipeout';

var styles = StyleSheet.create({
  listRow: {
    padding: 10
  },
  scrollView: {
    flex: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  swipeButton: {
    color: '#ffffff',
    margin: 10,
    textAlign: 'center'
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  }
});

class RoutineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routineDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,

      })
    };
  }
  componentDidMount() {
    this._listen();
    RoutineActions.listRoutines();
  }

  _cancelButton() {
    this.props.navigator.pop();
  }

  _listen() {
    this._subscription = RoutineStore.listen(this._onRoutinesChange.bind(this));
  }

  _newRoutineButton() {
    this._unlisten();
    this.props.navigator.push({
      component: NewRoutine,
      props: { parentListen: this._listen.bind(this) }
    });
  }

  _onRoutinesChange(routines) {
    this.setState({
      routineDataSource: this.state.routineDataSource.cloneWithRows(Object.clone(routines))
    });
  }

  _unlisten() {
    this._subscription();
  }

  render() {
    var screen = Dimensions.get("window");
    var bottomButtons = [{
      text: "Cancel",
      onPressEvent: this._cancelButton.bind(this)
    }, {
      text: "New Routine",
      onPressEvent: this._newRoutineButton.bind(this)
    }];
    return(
      <View style={styles.view}>
        <ListView
          style={[{ width: screen.width }, styles.scrollView]}
          dataSource={this.state.routineDataSource}
          renderRow={(routine) => {
            var buttons = [{
              backgroundColor: '#df9124',
              component: (<Text style={styles.swipeButton}>Edit</Text>)
            },{
              backgroundColor: '#cc0000',
              component: (<Text style={styles.swipeButton}>Delete</Text>)
            }];
            return (
              <View>
                <Swipeout autoClose={true} right={buttons} backgroundColor='#ffffff'>
                  <Text style={styles.listRow}>{routine.name}</Text>
                  <View style={styles.separator}></View>
                </Swipeout>
              </View>
            );
          }}
          />
        <BottomBar buttons={bottomButtons} />
      </View>
    );
  }
}

export default RoutineList;

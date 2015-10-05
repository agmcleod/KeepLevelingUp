'use strict';

const React = require('react-native');

const {
  Component,
  Dimensions,
  ListView,
  StyleSheet,
  Text,
  View
} = React;

import BottomBar from '../components/bottom_bar.ios';
import RoutineActions from './routine_actions';
import RoutineStore from './routine_store';
import RoutineForm from './routine_form.ios';

import Swipeout from 'react-native-swipeout';

const styles = StyleSheet.create({
  listRow: {
    fontFamily: 'Optima',
    padding: 20,
    fontSize: 16
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
    fontFamily: 'Optima',
    fontSize: 16,
    margin: 10,
    paddingTop: 5,
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
  }

  componentWillUnmount() {
    this._unlisten();
    this.props.parentListen();
  }

  _cancelPressEvent() {
    this.props.navigator.pop();
  }

  _listen() {
    this._subscription = RoutineStore.listen(this._onRoutinesChange.bind(this));
    RoutineActions.listRoutines();
  }

  _newRoutineButton() {
    this._unlisten();
    this.props.navigator.push({
      component: RoutineForm,
      props: { parentListen: this._listen.bind(this) },
      type: "left"
    });
  }

  _onDeletePress(uuid) {
    RoutineActions.deleteRoutine(uuid);
  }

  _onEditPress(routine) {
    this._unlisten();
    this.props.navigator.push({
      component: RoutineForm,
      props: { routine: routine, parentListen: this._listen.bind(this) },
      type: "left"
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
    const screen = Dimensions.get("window");
    const bottomButtons = [{
      text: "New Routine",
      onPressEvent: this._newRoutineButton.bind(this)
    }, {
      text: "Home",
      onPressEvent: this._cancelPressEvent.bind(this)
    }];
    return(
      <View style={styles.view}>
        <ListView
          style={[{ width: screen.width }, styles.scrollView]}
          dataSource={this.state.routineDataSource}
          renderRow={(routine) => {
            const buttons = [{
              backgroundColor: '#39b54a',
              component: (<Text style={styles.swipeButton}>Edit</Text>),
              onPress: () => { this._onEditPress(routine); }
            },{
              backgroundColor: '#cc0000',
              component: (<Text style={styles.swipeButton}>Delete</Text>),
              onPress: () => { this._onDeletePress(routine.uuid); }
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

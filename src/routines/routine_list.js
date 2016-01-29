const React = require('react-native');
import {connect} from 'react-redux';

const {
  Component,
  Dimensions,
  ListView,
  StyleSheet,
  Text,
  View
} = React;

import BottomBar from '../components/bottom_bar';
import {deleteRoutine, saveRoutines} from './routine_actions';
import RoutineForm from './routine_form';

import Swipeout from 'react-native-swipeout';

const styles = StyleSheet.create({
  listRow: {
    fontFamily: 'Optima',
    padding: 20,
    fontSize: 16
  },
  scrollView: {
    flex: 10
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
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
  static displayName = 'RoutineList';

  static propTypes = {
    navigator: React.PropTypes.object,
    deleteRoutine: React.PropTypes.func,
    saveRoutines: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      routineDataSource: dataSource.cloneWithRows(props.routines)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      routineDataSource: this.state.routineDataSource.cloneWithRows(Object.clone(props.routines))
    });
  }

  _cancelPressEvent() {
    this.props.navigator.pop();
  }

  _newRoutineButton() {
    this.props.navigator.push({
      component: RoutineForm,
      type: 'left'
    });
  }

  _onDeletePress(uuid) {
    this.props.deleteRoutine(uuid);
    this.props.saveRoutines();
  }

  _onEditPress(routine) {
    this.props.navigator.push({
      component: RoutineForm,
      props: {routine: routine},
      type: 'left'
    });
  }

  render() {
    const screen = Dimensions.get('window');
    const bottomButtons = [{
      text: 'New Routine',
      onPressEvent: this._newRoutineButton.bind(this)
    }, {
      text: 'Home',
      onPressEvent: this._cancelPressEvent.bind(this)
    }];
    return (
      <View style={styles.view}>
        <ListView
          style={[{width: screen.width}, styles.scrollView]}
          dataSource={this.state.routineDataSource}
          renderRow={(routine) => {
            const buttons = [{
              backgroundColor: '#39b54a',
              component: (<Text style={styles.swipeButton}>Edit</Text>),
              onPress: () => this._onEditPress(routine)
            }, {
              backgroundColor: '#cc0000',
              component: (<Text style={styles.swipeButton}>Delete</Text>),
              onPress: () => this._onDeletePress(routine.uuid)
            }];
            return (
              <View>
                <Swipeout autoClose={true} right={buttons} backgroundColor='#ffffff'>
                  <Text style={styles.listRow}>{routine.name}</Text>
                  <View style={styles.separator} />
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

export default connect((state) => {
  return {
    routines: state.routines
  };
}, {
  deleteRoutine, saveRoutines
})(RoutineList);

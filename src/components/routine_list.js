'use strict';

var React = require('react-native');

var {
  Component,
  Dimensions,
  ListView,
  StyleSheet,
  View
} = React;

var BottomBar = require('./bottom_bar');
var RoutineActions = require('../routines/routine_actions');
var RoutineStore = require('../routines/routine_store');

var styles = StyleSheet.create({
  scrollView: {
    flex: 10,
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
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }
  componentDidMount() {
    RoutineStore.listen(this._onRoutinesChange.bind(this));
    RoutineActions.listRoutines();
  }

  _cancelButton() {
    this.props.navigator.pop();
  }

  _onRoutinesChange(routines) {
    this.setState({
      routineDataSource: this.state.routineDataSource.cloneWithRows(Object.clone(routines))
    });
  }

  render() {
    var screen = Dimensions.get("window");
    var bottomButtons = [{
      text: "Cancel",
      onPressEvent: this._cancelButton.bind(this)
    }, {
      text: "New Routine"
    }];
    return(
      <View style={styles.view}>
        <ListView style={[{ width: screen.width }, styles.scrollView]} dataSource={this.state.routineDataSource}>

        </ListView>
        <BottomBar buttons={bottomButtons} />
      </View>
    );
  }
}

module.exports = RoutineList;

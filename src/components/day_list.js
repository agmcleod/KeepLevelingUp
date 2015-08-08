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
    color: '#ffffff',
    paddingTop: 15,
    textAlign: 'center',
    backgroundColor: '#E57F7F',
    alignSelf: 'stretch',
    flex: 1,
    borderRightColor: '#ffffff',
    borderRightWidth: 1
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  scrollView: {
    flex: 10,
  },
  pageControl: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  }
});

class DayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    };
  }

  _onScroll(event) {
    var screen = Dimensions.get("window");
    var offsetX = event.nativeEvent.contentOffset.x, pageWidth = screen.width;
    this.setState({
      currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1
    });
  }

  render() {
    var screen = Dimensions.get("window");
    return (
      <View style={styles.view}>
        <ScrollView style={[{width: screen.width}, styles.scrollView]} horizontal={true} bounces={false} showsHorizontalScrollIndicator={true} onScroll={this._onScroll.bind(this)} pagingEnabled={true}>
          <View style={{width: screen.width}}>
            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </View>
          <View style={{width: screen.width}}>
            <Text>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</Text>
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Routines</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText}>New Day</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

module.exports = DayList;

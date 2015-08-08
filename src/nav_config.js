var React = require('react-native');
var {
  Dimensions
} = React;

var buildStyleInterpolator = require('buildStyleInterpolator');
var PixelRatio = require('PixelRatio');

var BaseLeftToRightGesture = {

  // If the gesture can end and restart during one continuous touch
  isDetachable: false,

  // How far the swipe must drag to start transitioning
  gestureDetectMovement: 2,

  // Amplitude of release velocity that is considered still
  notMoving: 0.3,

  // Fraction of directional move required.
  directionRatio: 0.66,

  // Velocity to transition with when the gesture release was "not moving"
  snapVelocity: 2,

  // Region that can trigger swipe. iOS default is 30px from the left edge
  edgeHitWidth: 30,

  // Ratio of gesture completion when non-velocity release will cause action
  stillCompletionRatio: 3 / 5,
  fullDistance: Dimensions.get("window").width,
  direction: 'left-to-right',
};
var FromTheRight = {
  opacity: {
    value: 1.0,
    type: 'constant',
  },

  transformTranslate: {
    from: {x: Dimensions.get('window').width, y: 0, z: 0},
    to: {x: 0, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },

  translateX: {
    from: Dimensions.get('window').width,
    to: 0,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },

  scaleX: {
    value: 1,
    type: 'constant',
  },
  scaleY: {
    value: 1,
    type: 'constant',
  },
};
var ToTheLeft = {
  transformTranslate: {
    from: {x: 0, y: 0, z: 0},
    to: {x: -Dimensions.get('window').width, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
  opacity: {
    value: 1.0,
    type: 'constant',
  },

  translateX: {
    from: 0,
    to: -Dimensions.get('window').width,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
};
module.exports = {
  gestures: {
    pop: BaseLeftToRightGesture,
  },

  // Rebound spring parameters when transitioning FROM this scene
  springFriction: 26,
  springTension: 200,

  // Velocity to start at when transitioning without gesture
  defaultTransitionVelocity: 1.5,

  // Animation interpolators for horizontal transitioning:
  animationInterpolators: {
    into: buildStyleInterpolator(FromTheRight),
    out: buildStyleInterpolator(ToTheLeft),
  }
};

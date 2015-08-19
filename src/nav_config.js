var React = require('react-native');
var {
  Dimensions
} = React;

var buildStyleInterpolator = require('buildStyleInterpolator');
var PixelRatio = require('PixelRatio');

var SCREEN_WIDTH = Dimensions.get('window').width;

var FromTheRight = {
  opacity: {
    value: 1.0,
    type: 'constant',
  },

  transformTranslate: {
    from: {x: SCREEN_WIDTH, y: 0, z: 0},
    to: {x: 0, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },

  translateX: {
    from: SCREEN_WIDTH,
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
    to: {x: -SCREEN_WIDTH, y: 0, z: 0},
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
    to: -SCREEN_WIDTH,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
};

var FromTheLeft = {
  ...FromTheRight,
  transformTranslate: {
    from: {x: -SCREEN_WIDTH, y: 0, z: 0},
    to: {x: 0, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
  translateX: {
    from: -SCREEN_WIDTH,
    to: 0,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
};

var ToTheRight = {
  ...ToTheLeft,
  transformTranslate: {
    from: {x: 0, y: 0, z: 0},
    to: {x: SCREEN_WIDTH, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
  translateX: {
    from: 0,
    to: SCREEN_WIDTH,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
};

module.exports = {
  toLeft: {
    // Rebound spring parameters when transitioning FROM this scene
    springFriction: 26,
    springTension: 200,

    // Velocity to start at when transitioning without gesture
    defaultTransitionVelocity: 1.5,

    // Animation interpolators for horizontal transitioning:
    animationInterpolators: {
      into: buildStyleInterpolator(FromTheLeft),
      out: buildStyleInterpolator(ToTheRight),
    }
  },
  toRight: {
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
  }
};

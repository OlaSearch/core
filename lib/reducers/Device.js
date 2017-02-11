'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ismobilejs = require('ismobilejs');

/* Structure
  {
    isApple: {
      device,
      ipod,
      phone,
      tablet
    },
    isAndroid: {
      device,
      phone,
      tablet
    },
    other: {
      blackberry,
      blackberry10,
      chrome,
      device,
      firefox,
      opera
    },
    phone,
    seven_inch,
    tablet
  }
*/

var initialState = {
  isPhone: _ismobilejs.phone,
  isAndroid: _ismobilejs.android,
  isApple: _ismobilejs.apple,
  isTablet: _ismobilejs.tablet,
  isDesktop: !_ismobilejs.phone && !_ismobilejs.tablet && !_ismobilejs.seven_inch
};

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    default:
      return state;
  }
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ismobilejs = require('ismobilejs');

var _ismobilejs2 = require('../../.babelhelper.js').interopRequireDefault(_ismobilejs);

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
    }
  }
*/

var initialState = {
  isPhone: _ismobilejs2['default'].phone,
  isAndroid: _ismobilejs2['default'].android,
  isApple: _ismobilejs2['default'].apple,
  isTablet: _ismobilejs2['default'].tablet
};

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    default:
      return state;
  }
};
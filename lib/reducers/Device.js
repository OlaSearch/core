'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _ismobilejs = require('ismobilejs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
  isAndroid: _ismobilejs.android,
  isApple: _ismobilejs.apple,
  isPhone: _ismobilejs.phone,
  isTablet: _ismobilejs.tablet,
  isDesktop: !_ismobilejs.phone && !_ismobilejs.tablet && !_ismobilejs.seven_inch,
  connection: 'online'
};

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].UPDATE_CONNECTION:
      return (0, _extends3['default'])({}, state, {
        connection: action.status
      });
    default:
      return state;
  }
};
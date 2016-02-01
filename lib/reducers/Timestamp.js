'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsActionTypes = require('./../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

var initialState = {
	timestamp: null
};

exports['default'] = function (state, action) {
	if (state === undefined) state = initialState;

	switch (action.type) {

		case _constantsActionTypes2['default'].REQUEST_SEARCH:
		case _constantsActionTypes2['default'].REQUEST_GUIDE:
		case _constantsActionTypes2['default'].REQUEST_AUTOSUGGEST:
			return _extends({}, state, {
				timestamp: new Date().getTime()
			});

		default:
			return state;
	}
};

module.exports = exports['default'];
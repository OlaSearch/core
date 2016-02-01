'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ismobilejs = require('ismobilejs');

var _ismobilejs2 = _interopRequireDefault(_ismobilejs);

var initialState = {
	isPhone: _ismobilejs2['default'].phone,
	isTablet: _ismobilejs2['default'].tablet
};

exports['default'] = function (state, action) {
	if (state === undefined) state = initialState;

	switch (action.type) {
		default:
			return state;
	}
};

module.exports = exports['default'];
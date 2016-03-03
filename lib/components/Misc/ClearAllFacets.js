'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ClearAllFacets = function ClearAllFacets(_ref) {
	var selected = _ref.selected;
	var dispatch = _ref.dispatch;


	if (!selected.length) return _react2.default.createElement('noscript', null);

	return _react2.default.createElement(
		'button',
		{
			type: 'button',
			className: 'ola-link-clear-all-filters',
			onClick: function onClick() {

				dispatch((0, _Search.removeAllFacets)());
				dispatch((0, _Search.executeSearch)());
			}
		},
		'Clear all filters'
	);
};

module.exports = ClearAllFacets;
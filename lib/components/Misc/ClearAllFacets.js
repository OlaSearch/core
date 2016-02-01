'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actionsSearch = require('./../../actions/Search');

var ClearAllFacets = function ClearAllFacets(props) {
	var dispatch = props.dispatch;
	var selected = props.selected;

	if (!selected.length) return _react2['default'].createElement('noscript', null);

	return _react2['default'].createElement(
		'button',
		{
			type: 'button',
			className: 'ola-link-clear-all-filters',
			onClick: function () {

				dispatch((0, _actionsSearch.removeAllFacets)());
				dispatch((0, _actionsSearch.executeSearch)());
			}
		},
		'Clear all filters'
	);
};

module.exports = ClearAllFacets;
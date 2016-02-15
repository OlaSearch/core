'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Sort = function Sort(props, context) {
	var sortBy = context.config.sortBy;
	var dispatch = props.dispatch;
	var selected = props.selected;


	return _react2.default.createElement(
		'div',
		{ className: 'ola-sort' },
		_react2.default.createElement(
			'label',
			null,
			'Sort by '
		),
		_react2.default.createElement(
			'select',
			{
				value: selected,
				onChange: function onChange(event) {

					dispatch((0, _Search.changeSort)(event.target.value));

					dispatch((0, _Search.executeSearch)());
				}
			},
			_react2.default.createElement(
				'option',
				{ value: '' },
				'Relevance'
			),
			sortBy.map(function (sort, idx) {
				return _react2.default.createElement(
					'option',
					{ key: idx, value: sort.value },
					sort.name
				);
			})
		)
	);
};

Sort.propTypes = {
	dispatch: _react2.default.PropTypes.func.isRequired,
	selected: _react2.default.PropTypes.string.isRequired
};

Sort.contextTypes = {
	config: _react2.default.PropTypes.object
};

module.exports = Sort;
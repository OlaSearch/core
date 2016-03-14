'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PerPage = function PerPage(_ref, context) {
	var perPage = _ref.perPage;
	var label = _ref.label;
	var dispatch = _ref.dispatch;


	var values = context.config.perPage;

	return _react2['default'].createElement(
		'div',
		{ className: 'ola-per-page' },
		_react2['default'].createElement(
			'label',
			null,
			label
		),
		_react2['default'].createElement(
			'select',
			{
				defaultValue: perPage,
				onChange: function onChange(event) {

					dispatch((0, _Search.changePerPage)(event.target.value));

					dispatch((0, _Search.executeSearch)());
				}
			},
			values.map(function (value, idx) {
				return _react2['default'].createElement(
					'option',
					{ key: idx },
					value
				);
			})
		)
	);
};

PerPage.contextTypes = {
	config: _react2['default'].PropTypes.object
};

PerPage.defaultProps = {
	label: 'Results per page'
};

module.exports = PerPage;
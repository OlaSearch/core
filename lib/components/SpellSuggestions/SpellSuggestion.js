'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actionsSearch = require('./../../actions/Search');

var SpellSuggestion = (function (_React$Component) {
	_inherits(SpellSuggestion, _React$Component);

	function SpellSuggestion(props) {
		var _this = this;

		_classCallCheck(this, SpellSuggestion);

		_get(Object.getPrototypeOf(SpellSuggestion.prototype), 'constructor', this).call(this, props);

		this.onChange = function (term) {
			var dispatch = _this.props.dispatch;

			dispatch((0, _actionsSearch.updateQueryTerm)(term));

			dispatch((0, _actionsSearch.executeSearch)());
		};
	}

	_createClass(SpellSuggestion, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var suggestions = _props.suggestions;
			var onChange = _props.onChange;
			var totalResults = _props.totalResults;

			if (!suggestions.length) return null;

			var max = suggestions.reduce(function (a, b) {
				return a.count > b.count ? a : b;
			});

			/* Check if Current results is less than the suggestions */

			if (totalResults >= max.count) return null;

			return _react2['default'].createElement(
				'div',
				{ className: 'ola-spell-suggestion' },
				_react2['default'].createElement(
					'span',
					null,
					'Did you mean'
				),
				suggestions.map(function (item, idx) {

					return _react2['default'].createElement(
						'button',
						{
							type: 'button',
							className: 'ola-spell-links',
							key: idx,
							onClick: function () {
								onChange ? onChange(item.term) : _this2.onChange(item.term);
							}
						},
						_react2['default'].createElement(
							'span',
							{ className: 'ola-spell-term' },
							item.term
						),
						_react2['default'].createElement(
							'span',
							{ className: 'ola-spell-count' },
							item.count
						)
					);
				})
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			suggestions: _react2['default'].PropTypes.array.isRequired,
			totalResults: _react2['default'].PropTypes.number.isRequired,
			dispatch: _react2['default'].PropTypes.func.isRequired
		},
		enumerable: true
	}]);

	return SpellSuggestion;
})(_react2['default'].Component);

exports['default'] = SpellSuggestion;
module.exports = exports['default'];
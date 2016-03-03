'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var SpellSuggestion = function (_React$Component) {
	_inherits(SpellSuggestion, _React$Component);

	function SpellSuggestion(props) {
		_classCallCheck(this, SpellSuggestion);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SpellSuggestion).call(this, props));

		_this.onChange = function (term) {
			var dispatch = _this.props.dispatch;


			dispatch((0, _Search.updateQueryTerm)(term));

			dispatch((0, _Search.executeSearch)());
		};

		return _this;
	}

	_createClass(SpellSuggestion, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var suggestions = _props.suggestions;
			var onChange = _props.onChange;
			var totalResults = _props.totalResults;
			var showCount = _props.showCount;


			if (!suggestions.length) return null;

			var max = suggestions.reduce(function (a, b) {
				return a.count > b.count ? a : b;
			});

			/* Check if Current results is less than the suggestions */

			if (totalResults >= max.count) return null;

			return _react2.default.createElement(
				'div',
				{ className: 'ola-spell-suggestion' },
				_react2.default.createElement(
					'span',
					null,
					'Did you mean'
				),
				suggestions.map(function (item, idx) {

					return _react2.default.createElement(
						'button',
						{
							type: 'button',
							className: 'ola-btn ola-spell-links',
							key: idx,
							onClick: function onClick() {
								onChange ? onChange(item.term) : _this2.onChange(item.term);
							}
						},
						_react2.default.createElement(
							'span',
							{ className: 'ola-spell-term' },
							item.term
						),
						showCount && _react2.default.createElement(
							'span',
							{ className: 'ola-spell-count' },
							item.count
						)
					);
				})
			);
		}
	}]);

	return SpellSuggestion;
}(_react2.default.Component);

SpellSuggestion.propTypes = {
	suggestions: _react2.default.PropTypes.array.isRequired,
	totalResults: _react2.default.PropTypes.number.isRequired,
	dispatch: _react2.default.PropTypes.func.isRequired,
	showCount: _react2.default.PropTypes.bool
};
SpellSuggestion.defaultProps = {
	showCount: true
};


module.exports = SpellSuggestion;
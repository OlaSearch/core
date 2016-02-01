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

var _reactRedux = require('react-redux');

var _reactOnclickoutsideDecorator = require('react-onclickoutside/decorator');

var _reactOnclickoutsideDecorator2 = _interopRequireDefault(_reactOnclickoutsideDecorator);

var _actionsAutoSuggest = require('./../../actions/AutoSuggest');

var _Suggestions = require('./Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _SpellSuggestionsTermSuggestion = require('./../SpellSuggestions/TermSuggestion');

var _SpellSuggestionsTermSuggestion2 = _interopRequireDefault(_SpellSuggestionsTermSuggestion);

var _SpellSuggestionsSpellSuggestion = require('./../SpellSuggestions/SpellSuggestion');

var _SpellSuggestionsSpellSuggestion2 = _interopRequireDefault(_SpellSuggestionsSpellSuggestion);

var AutoSuggest = (function (_React$Component) {
	_inherits(AutoSuggest, _React$Component);

	function AutoSuggest() {
		var _this = this;

		_classCallCheck(this, _AutoSuggest);

		_get(Object.getPrototypeOf(_AutoSuggest.prototype), 'constructor', this).apply(this, arguments);

		this.handleClickOutside = function (event) {
			var isOpen = _this.props.AutoSuggest.isOpen;

			if (isOpen) {

				_this.props.dispatch((0, _actionsAutoSuggest.closeAutoSuggest)());
			}
		};

		this.onChange = function (term) {
			var dispatch = _this.props.dispatch;

			if (!term) {

				return dispatch((0, _actionsAutoSuggest.clearQueryTerm)());
			}

			dispatch((0, _actionsAutoSuggest.updateQueryTerm)(term));

			dispatch((0, _actionsAutoSuggest.executeAutoSuggest)());
		};

		this.onClear = function () {

			_this.props.dispatch((0, _actionsAutoSuggest.clearQueryTerm)());
		};

		this.onSubmit = function (event) {

			_this.handleViewAll();

			event.preventDefault();
		};

		this.handleViewAll = function () {
			var q = _this.props.AutoSuggest.query.q;
			var _props = _this.props;
			var searchUrl = _props.searchUrl;
			var dispatch = _props.dispatch;
			var onSubmit = _props.onSubmit;

			dispatch((0, _actionsAutoSuggest.closeAutoSuggest)());

			onSubmit && onSubmit.call(_this, q);

			window.location.href = searchUrl + 'q=' + q;
		};
	}

	_createClass(AutoSuggest, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var dispatch = _props2.dispatch;
			var AutoSuggest = _props2.AutoSuggest;
			var bookmarks = _props2.bookmarks;
			var components = _props2.components;
			var results = AutoSuggest.results;
			var query = AutoSuggest.query;
			var spellSuggestions = AutoSuggest.spellSuggestions;
			var suggestedTerm = AutoSuggest.suggestedTerm;
			var isOpen = AutoSuggest.isOpen;
			var totalResults = AutoSuggest.totalResults;

			var klass = 'ola-suggestions' + (isOpen ? '' : ' js-hide');

			return _react2['default'].createElement(
				'form',
				{ className: 'ola-autosuggest', onSubmit: this.onSubmit },
				_react2['default'].createElement(
					'div',
					{ className: 'ola-autosuggest-container' },
					_react2['default'].createElement(_Input2['default'], {
						q: query.q,
						onChange: this.onChange,
						onClear: this.onClear
					}),
					_react2['default'].createElement(
						'div',
						{ className: klass },
						_react2['default'].createElement(_SpellSuggestionsTermSuggestion2['default'], { term: suggestedTerm }),
						_react2['default'].createElement(_SpellSuggestionsSpellSuggestion2['default'], {
							suggestions: spellSuggestions,
							onChange: this.onChange,
							totalResults: totalResults,
							dispatch: dispatch
						}),
						_react2['default'].createElement(_Suggestions2['default'], {
							results: results,
							isOpen: isOpen,
							dispatch: dispatch,
							bookmarks: bookmarks,
							components: components
						}),
						_react2['default'].createElement(
							'a',
							{ className: 'ola-autosuggest-all', onClick: this.handleViewAll },
							'View all results'
						)
					)
				)
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			AutoSuggest: _react2['default'].PropTypes.object.isRequired,
			bookmarks: _react2['default'].PropTypes.array,
			dispatch: _react2['default'].PropTypes.func.isRequired,
			onSubmit: _react2['default'].PropTypes.func
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			showBookmarks: true,
			searchUrl: 'search.html?'
		},
		enumerable: true
	}]);

	var _AutoSuggest = AutoSuggest;
	AutoSuggest = (0, _reactOnclickoutsideDecorator2['default'])()(AutoSuggest) || AutoSuggest;
	AutoSuggest = (0, _reactRedux.connect)(function (state) {
		return {
			AutoSuggest: state.AutoSuggest,
			bookmarks: state.AppState.bookmarks
		};
	})(AutoSuggest) || AutoSuggest;
	return AutoSuggest;
})(_react2['default'].Component);

exports['default'] = AutoSuggest;
module.exports = exports['default'];
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _decorator = require('react-onclickoutside/decorator');

var _decorator2 = _interopRequireDefault(_decorator);

var _AutoSuggest = require('./../../actions/AutoSuggest');

var _Suggestions = require('./Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _TermSuggestion = require('./../SpellSuggestions/TermSuggestion');

var _TermSuggestion2 = _interopRequireDefault(_TermSuggestion);

var _SpellSuggestion = require('./../SpellSuggestions/SpellSuggestion');

var _SpellSuggestion2 = _interopRequireDefault(_SpellSuggestion);

var _FacetSuggestion = require('./FacetSuggestion');

var _FacetSuggestion2 = _interopRequireDefault(_FacetSuggestion);

var _urlSync = require('./../../services/urlSync');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoSuggest = function (_React$Component) {
	_inherits(AutoSuggest, _React$Component);

	function AutoSuggest(props) {
		_classCallCheck(this, AutoSuggest);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoSuggest).call(this, props));

		_this.handleClickOutside = function (event) {
			var isOpen = _this.props.AutoSuggest.isOpen;

			if (isOpen) {

				_this.props.dispatch((0, _AutoSuggest.closeAutoSuggest)());
			}
		};

		_this.onChange = function (term) {
			var dispatch = _this.props.dispatch;

			if (!term) {

				return dispatch((0, _AutoSuggest.clearQueryTerm)());
			}

			dispatch((0, _AutoSuggest.updateQueryTerm)(term));

			dispatch((0, _AutoSuggest.executeAutoSuggest)());
		};

		_this.onClear = function () {

			_this.props.dispatch((0, _AutoSuggest.clearQueryTerm)());
		};

		_this.onSubmit = function (event) {

			_this.handleViewAll();

			event && event.preventDefault();
		};

		_this.handleViewAll = function () {
			var _this$props$AutoSugge = _this.props.AutoSuggest.query;
			var q = _this$props$AutoSugge.q;
			var facet_query = _this$props$AutoSugge.facet_query;
			var _this$props = _this.props;
			var searchUrl = _this$props.searchUrl;
			var dispatch = _this$props.dispatch;
			var onSubmit = _this$props.onSubmit;

			dispatch((0, _AutoSuggest.closeAutoSuggest)());

			onSubmit && onSubmit.call(_this, q);

			window.location.href = searchUrl + (0, _urlSync.buildQueryString)({ q: q, facet_query: facet_query });
		};

		_this.state = {
			activeSuggest: 0
		};
		return _this;
	}

	_createClass(AutoSuggest, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var dispatch = _props.dispatch;
			var AutoSuggest = _props.AutoSuggest;
			var bookmarks = _props.bookmarks;
			var components = _props.components;
			var showFacetSuggestions = _props.showFacetSuggestions;
			var results = AutoSuggest.results;
			var query = AutoSuggest.query;
			var spellSuggestions = AutoSuggest.spellSuggestions;
			var suggestedTerm = AutoSuggest.suggestedTerm;
			var isOpen = AutoSuggest.isOpen;
			var totalResults = AutoSuggest.totalResults;
			var facets = AutoSuggest.facets;
			var q = query.q;

			var klass = 'ola-suggestions' + (isOpen ? '' : ' js-hide');

			var shouldShowFacetSuggestions = showFacetSuggestions && !suggestedTerm && !spellSuggestions.length;

			return _react2.default.createElement(
				'form',
				{ className: 'ola-autosuggest', onSubmit: this.onSubmit },
				_react2.default.createElement(
					'div',
					{ className: 'ola-autosuggest-container' },
					_react2.default.createElement(_Input2.default, {
						q: q,
						onChange: this.onChange,
						onClear: this.onClear
					}),
					_react2.default.createElement(
						'div',
						{ className: klass },
						_react2.default.createElement(_TermSuggestion2.default, { term: suggestedTerm }),
						_react2.default.createElement(_SpellSuggestion2.default, {
							suggestions: spellSuggestions,
							onChange: this.onChange,
							totalResults: totalResults,
							dispatch: dispatch
						}),
						_react2.default.createElement(
							'div',
							{ className: 'ola-suggestions-wrapper' },
							shouldShowFacetSuggestions ? _react2.default.createElement(_FacetSuggestion2.default, {
								facets: facets,
								query: query,
								name: 'genres_sm',
								dispatch: dispatch,
								onSubmit: this.onSubmit,
								addFacet: _AutoSuggest.addFacet
							}) : null,
							_react2.default.createElement(_Suggestions2.default, {
								results: results,
								isOpen: isOpen,
								dispatch: dispatch,
								bookmarks: bookmarks,
								components: components
							})
						),
						_react2.default.createElement(
							'a',
							{ className: 'ola-autosuggest-all', onClick: this.handleViewAll },
							'View all results'
						)
					)
				)
			);
		}
	}]);

	return AutoSuggest;
}(_react2.default.Component);

AutoSuggest.propTypes = {
	AutoSuggest: _react2.default.PropTypes.object.isRequired,
	bookmarks: _react2.default.PropTypes.array,
	showFacetSuggestions: _react2.default.PropTypes.bool,
	dispatch: _react2.default.PropTypes.func.isRequired,
	onSubmit: _react2.default.PropTypes.func
};
AutoSuggest.defaultProps = {
	showBookmarks: true,
	searchUrl: 'search.html?',
	showFacetSuggestions: false
};

function mapStateToProps(state) {

	return {
		AutoSuggest: state.AutoSuggest,
		bookmarks: state.AppState.bookmarks
	};
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)((0, _decorator2.default)(AutoSuggest));
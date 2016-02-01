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

var _SnippetsDefault = require('./../Snippets/Default');

var _SnippetsDefault2 = _interopRequireDefault(_SnippetsDefault);

var _utilities = require('./../../utilities');

var SearchResults = (function (_React$Component) {
	_inherits(SearchResults, _React$Component);

	function SearchResults(props) {
		_classCallCheck(this, SearchResults);

		_get(Object.getPrototypeOf(SearchResults.prototype), 'constructor', this).call(this, props);
	}

	_createClass(SearchResults, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {

			return this.props.results != nextProps.results || this.props.bookmarks != nextProps.bookmarks;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var results = _props.results;
			var dispatch = _props.dispatch;
			var bookmarks = _props.bookmarks;
			var components = _props.components;
			var isAutocomplete = _props.isAutocomplete;
			var _context$config = this.context.config;
			var snippetRules = _context$config.snippetRules;
			var defaultSnippet = _context$config.defaultSnippet;

			return _react2['default'].createElement(
				'div',
				{ className: 'ola-results' },
				results.map(function (result, idx) {

					var OlaSnippet = (0, _utilities.getMatchingSnippet)(snippetRules, result) || defaultSnippet || _SnippetsDefault2['default'];

					return _react2['default'].createElement(OlaSnippet, {
						result: result,
						key: idx,
						dispatch: dispatch,
						bookmarks: bookmarks,
						isAutocomplete: isAutocomplete
					});
				})
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			results: _react2['default'].PropTypes.array.isRequired,
			bookmarks: _react2['default'].PropTypes.array,
			dispatch: _react2['default'].PropTypes.func,
			isLoading: _react2['default'].PropTypes.string
		},
		enumerable: true
	}, {
		key: 'contextTypes',
		value: {
			config: _react2['default'].PropTypes.object
		},
		enumerable: true
	}]);

	return SearchResults;
})(_react2['default'].Component);

exports['default'] = SearchResults;
module.exports = exports['default'];
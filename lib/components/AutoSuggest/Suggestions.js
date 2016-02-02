'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Default = require('./../Snippets/Default');

var _Default2 = _interopRequireDefault(_Default);

var _SearchResults = require('./../SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Suggestions = function Suggestions(props) {
	var results = props.results;
	var dispatch = props.dispatch;
	var bookmarks = props.bookmarks;
	var components = props.components;

	return _react2.default.createElement(
		'div',
		{ className: 'ola-suggestions-wrapper' },
		_react2.default.createElement(_SearchResults2.default, _extends({ isAutocomplete: true }, props))
	);
};

Suggestions.propTypes = {
	results: _react2.default.PropTypes.array,
	dispatch: _react2.default.PropTypes.func.isRequired,
	bookmarks: _react2.default.PropTypes.array
};

module.exports = Suggestions;
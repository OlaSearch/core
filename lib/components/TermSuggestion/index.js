'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function TermSuggestion(_ref) {
  var term = _ref.term,
      answer = _ref.answer,
      totalResults = _ref.totalResults,
      translate = _ref.translate,
      className = _ref.className;

  if (!term) return null;
  if (answer && (answer.data || answer.callback || answer.suggestions && answer.suggestions.length) || totalResults === 0) return null;
  return _react2['default'].createElement(
    'div',
    (0, _extends3['default'])({ className: 'ola-term-suggestion' }, className),
    translate('suggestions_showing_results_for', { term: term }, true)
  );
}

module.exports = (0, _OlaTranslate2['default'])(TermSuggestion);
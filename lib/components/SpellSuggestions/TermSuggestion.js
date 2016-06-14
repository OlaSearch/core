'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = _interopRequireDefault(_olaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TermSuggestion = function TermSuggestion(_ref) {
  var term = _ref.term;
  var translate = _ref.translate;

  if (!term) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-term-suggestion' },
    translate('suggestions_showing_results_for', { term: term }, true)
  );
};

module.exports = (0, _olaTranslate2['default'])(TermSuggestion);
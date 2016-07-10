'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_olaTranslate);

var TermSuggestion = function TermSuggestion(_ref) {
  var term = _ref.term;
  var translate = _ref.translate;
  var className = _ref.className;

  if (!term) return null;
  return _react2['default'].createElement(
    'div',
    require('../../../.babelhelper.js')['extends']({ className: 'ola-term-suggestion' }, className),
    translate('suggestions_showing_results_for', { term: term }, true)
  );
};

module.exports = (0, _olaTranslate2['default'])(TermSuggestion);
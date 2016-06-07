'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Settings = require('./../../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TermSuggestion = function TermSuggestion(_ref) {
  var term = _ref.term;

  if (!term) return _Settings.NO_SCRIPT_TAG;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-term-suggestion' },
    'Showing results for ',
    _react2['default'].createElement(
      'strong',
      null,
      term
    )
  );
};

module.exports = TermSuggestion;
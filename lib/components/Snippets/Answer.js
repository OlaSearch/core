'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DefaultAnswerSnippet = function DefaultAnswerSnippet(_ref) {
  var ola_answer = _ref.result.ola_answer;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet-answer' },
    _react2['default'].createElement('div', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(ola_answer) })
  );
};

module.exports = DefaultAnswerSnippet;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = AnswerButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function AnswerButton(_ref) {
  var url = _ref.url,
      title = _ref.title;

  return _react2['default'].createElement(
    'a',
    { className: 'ola-answer-button ola-answer-email', href: url },
    title
  );
}
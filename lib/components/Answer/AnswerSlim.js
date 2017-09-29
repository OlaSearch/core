'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerQuick = function AnswerQuick(_ref) {
  var answer = _ref.answer,
      onSelect = _ref.onSelect;

  if (!answer) return null;
  var card = answer.card;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-slim', onClick: onSelect },
    card.title
  );
};

module.exports = AnswerQuick;
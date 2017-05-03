'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerGeneric = function AnswerGeneric(_ref) {
  var title = _ref.title,
      subtitle = _ref.subtitle,
      buttons = _ref.buttons;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-item' },
    _react2['default'].createElement(
      'div',
      { className: 'ola-answer-content' },
      _react2['default'].createElement(
        'h3',
        { className: 'ola-answer-title' },
        title
      ),
      _react2['default'].createElement(
        'div',
        { className: 'ola-answer-subtitle' },
        subtitle
      )
    )
  );
};

module.exports = AnswerGeneric;
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerField = function AnswerField(_ref) {
  var label = _ref.label,
      field = _ref.field,
      value = _ref.value,
      url = _ref.url,
      className = _ref.className;

  return _react2['default'].createElement(
    'div',
    { className: className },
    _react2['default'].createElement(
      'div',
      { className: 'ola-answer-value' },
      url ? _react2['default'].createElement(
        'a',
        { href: url },
        value
      ) : value
    )
  );
};

module.exports = AnswerField;
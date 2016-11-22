'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _ref2 = _react2['default'].createElement(
  'span',
  null,
  'Close'
);

var AnswerInfo = function AnswerInfo(_ref) {
  var answer = _ref.answer;
  var onClose = _ref.onClose;
  var data = answer.additional_data;

  if (!data) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-additional-data' },
    data.map(function (item, i) {
      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-additional-row', key: i },
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-additional-label' },
          item.label
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-additional-value' },
          item.value
        )
      );
    }),
    _react2['default'].createElement(
      'button',
      { className: 'ola-answer-additional-close', onClick: onClose },
      _ref2
    )
  );
};

module.exports = AnswerInfo;
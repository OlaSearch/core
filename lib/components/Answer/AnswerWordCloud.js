'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerWordMap = function AnswerWordMap(_ref) {
  var data = _ref.data,
      fontSizeMin = _ref.fontSizeMin,
      fontSizeMax = _ref.fontSizeMax;
  var record_data = data.record_data;

  var counts = record_data.map(function (_ref2) {
    var value = _ref2.value,
        count = _ref2.count;
    return count;
  });
  var max = Math.max.apply(undefined, counts);
  var min = Math.min.apply(undefined, counts);
  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-wordmap' },
    record_data.map(function (_ref3) {
      var value = _ref3.value,
          count = _ref3.count;

      var size = count === min ? fontSizeMin : count / max * (fontSizeMax - fontSizeMin) + fontSizeMin;
      return _react2['default'].createElement(
        'span',
        {
          style: { fontSize: size + 'px' }
        },
        value
      );
    })
  );
};

AnswerWordMap.defaultProps = {
  fontSizeMin: 16,
  fontSizeMax: 24
};

module.exports = AnswerWordMap;
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerWordMap = function AnswerWordMap(_ref) {
  var data = _ref.data,
      maxLen = _ref.maxLen,
      shuffle = _ref.shuffle,
      onSelect = _ref.onSelect,
      fontSizeMin = _ref.fontSizeMin,
      fontSizeMax = _ref.fontSizeMax;

  /* Return null if nothing */
  if (!data.length) return null;

  if (shuffle) {
    data.sort(function () {
      return 0.5 - Math.random();
    });
  }

  var counts = data.map(function (_ref2) {
    var title = _ref2.title,
        count = _ref2.count;
    return count;
  });
  var max = Math.max.apply(undefined, counts);
  var min = Math.min.apply(undefined, counts);
  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-wordmap' },
    data.slice(0, maxLen).map(function (_ref3, idx) {
      var title = _ref3.title,
          count = _ref3.count;

      var size = count === min ? fontSizeMin : count / max * (fontSizeMax - fontSizeMin) + fontSizeMin;
      return _react2['default'].createElement(WordMapItem, {
        key: idx,
        title: title,
        count: count,
        onSelect: onSelect,
        size: size
      });
    })
  );
};

var WordMapItem = function WordMapItem(_ref4) {
  var title = _ref4.title,
      count = _ref4.count,
      size = _ref4.size,
      onSelect = _ref4.onSelect;

  function handleClick(title) {
    onSelect && onSelect(title);
  }
  return _react2['default'].createElement(
    'button',
    {
      style: { fontSize: size + 'px' },
      onClick: handleClick,
      className: 'ola-answer-wordmap-item'
    },
    title
  );
};

AnswerWordMap.defaultProps = {
  fontSizeMin: 14,
  fontSizeMax: 28,
  maxLen: 10,
  shuffle: false
};

module.exports = AnswerWordMap;
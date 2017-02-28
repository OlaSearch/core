'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerList = function AnswerList(_ref) {
  var data = _ref.data;
  var lists = data.lists;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-lists' },
    lists.map(function (_ref2, idx) {
      var title = _ref2.title,
          items = _ref2.items;

      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-listitem', key: idx },
        title,
        _react2['default'].createElement(
          'ul',
          null,
          items.map(function (item, i) {
            return _react2['default'].createElement(
              'li',
              { key: i },
              item
            );
          })
        )
      );
    })
  );
};

module.exports = AnswerList;
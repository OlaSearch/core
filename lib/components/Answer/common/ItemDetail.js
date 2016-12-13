'use strict';

var _react = require('react');

var _react2 = require('../../../../.babelhelper.js').interopRequireDefault(_react);

var ItemDetail = function ItemDetail(_ref) {
  var _ref$data = _ref.data;
  var description = _ref$data.description;
  var title = _ref$data.title;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-itemdetail' },
    _react2['default'].createElement(
      'div',
      { className: 'ola-answer-title' },
      title
    ),
    _react2['default'].createElement(
      'div',
      { className: 'ola-answer-description' },
      description
    )
  );
};

module.exports = ItemDetail;
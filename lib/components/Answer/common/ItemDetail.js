'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ItemDetail = function ItemDetail(_ref) {
  var _ref$data = _ref.data,
      description = _ref$data.description,
      title = _ref$data.title;

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
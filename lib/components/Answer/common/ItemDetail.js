'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = ItemDetail;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function ItemDetail(_ref) {
  var _ref$data = _ref.data,
      description = _ref$data.description,
      title = _ref$data.title;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-itemdetails' },
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
}
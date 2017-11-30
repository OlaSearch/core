'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = ListKeyValue;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function ListKeyValue(_ref) {
  var data = _ref.data;

  if (!data) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-keyvalue' },
    data.map(function (_ref2, idx) {
      var label = _ref2.label,
          value = _ref2.value;

      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-row', key: idx },
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-label' },
          label
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-value' },
          (0, _utilities.formatText)(value, label)
        )
      );
    })
  );
}
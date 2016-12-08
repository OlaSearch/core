'use strict';

var _react = require('react');

var _react2 = require('../../../../.babelhelper.js').interopRequireDefault(_react);

var ListKeyValue = function ListKeyValue(_ref) {
  var data = _ref.data;

  if (!data) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-keyvalue' },
    data.map(function (_ref2, idx) {
      var label = _ref2.label;
      var value = _ref2.value;

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
          value
        )
      );
    })
  );
};

module.exports = ListKeyValue;
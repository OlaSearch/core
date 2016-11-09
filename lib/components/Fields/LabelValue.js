'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var LabelValue = function LabelValue(_ref) {
  var result = _ref.result;

  if (!result) return null;
  console.log(Object.keys(result));
  return _react2['default'].createElement(
    'div',
    null,
    Object.keys(result).filter(function (key) {
      return !!result[key];
    }).map(function (key) {
      return _react2['default'].createElement(
        'div',
        { key: key },
        key,
        ' - ',
        JSON.stringify(result[key])
      );
    })
  );
};

LabelValue.defaultProps = {
  ignoreProps: ['title', 'summary', 'highlighting', 'ola_answer', '_type', 'url', 'ola_collection_name', 'explain']
};

module.exports = LabelValue;
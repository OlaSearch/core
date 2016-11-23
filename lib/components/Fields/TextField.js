'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var TextField = function TextField(_ref) {
  var field = _ref.field;
  var result = _ref.result;
  var staticText = _ref.staticText;
  var length = _ref.length;
  var _ref$prefix = _ref.prefix;
  var prefix = _ref$prefix === undefined ? '' : _ref$prefix;
  var _ref$suffix = _ref.suffix;
  var suffix = _ref$suffix === undefined ? '' : _ref$suffix;
  var ellipsis = _ref.ellipsis;

  var fieldContent = result[field] || staticText;
  if (!fieldContent) return null;
  fieldContent = prefix + (0, _utilities.truncate)(fieldContent, length) + suffix;
  var klass = 'ola-field ola-field-highlighted-field ola-field-' + field;
  return _react2['default'].createElement('div', { className: klass, dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(fieldContent) });
};

TextField.defaultProps = {
  length: 200,
  ellipsis: '...'
};

module.exports = TextField;
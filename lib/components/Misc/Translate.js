'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var Translate = function Translate(_ref) {
  var id = _ref.id;
  var translate = _ref.translate;
  var _ref$tagName = _ref.tagName;
  var tagName = _ref$tagName === undefined ? 'span' : _ref$tagName;

  return _react2['default'].createElement(tagName, null, translate(id));
};

module.exports = (0, _OlaTranslate2['default'])(Translate);
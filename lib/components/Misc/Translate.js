'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Translate(_ref) {
  var id = _ref.id,
      translate = _ref.translate,
      tagName = _ref.tagName;

  return _react2['default'].createElement(tagName, null, translate(id));
}

Translate.defaultProps = {
  tagName: 'span'
};

module.exports = (0, _OlaTranslate2['default'])(Translate);
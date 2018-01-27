'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

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

module.exports = (0, _withTranslate2['default'])(Translate);
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = _interopRequireDefault(_olaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Translate = function Translate(_ref) {
  var id = _ref.id;
  var translate = _ref.translate;

  return _react2['default'].createElement(
    'span',
    null,
    translate(id)
  );
};

module.exports = (0, _olaTranslate2['default'])(Translate);
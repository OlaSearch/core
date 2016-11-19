'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var Phone = function Phone(props) {
  var phone = props.phone;
  var label = props.label;
  var translate = props.translate;

  var rest = require('../../../.babelhelper.js').objectWithoutProperties(props, ['phone', 'label', 'translate']);

  if (!phone) return null;

  var url = 'tel://' + (0, _utilities.sanitizePhone)(phone);

  return _react2['default'].createElement(
    'a',
    require('../../../.babelhelper.js')['extends']({ href: url, className: 'ola-btn ola-btn-call' }, rest),
    label || translate('call_label')
  );
};

module.exports = (0, _OlaTranslate2['default'])(Phone);
'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_olaTranslate);

var Phone = function Phone(props) {
  var phone = props.phone;
  var translate = props.translate;

  var rest = require('../../../.babelhelper.js').objectWithoutProperties(props, ['phone', 'translate']);

  if (!phone) return null;

  var url = 'tel://' + phone;

  return _react2['default'].createElement(
    'a',
    require('../../../.babelhelper.js')['extends']({ href: url, className: 'ola-btn ola-btn-call' }, rest),
    translate('call_label')
  );
};

module.exports = (0, _olaTranslate2['default'])(Phone);
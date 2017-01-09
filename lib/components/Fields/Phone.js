'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaLogger);

var Phone = function Phone(props) {
  var phone = props.phone,
      label = props.label,
      translate = props.translate,
      log = props.log,
      onClick = props.onClick,
      result = props.result,
      snippetId = props.snippetId,
      rest = require('../../../.babelhelper.js').objectWithoutProperties(props, ['phone', 'label', 'translate', 'log', 'onClick', 'result', 'snippetId']);

  if (!phone) return null;

  var url = 'tel://' + (0, _utilities.sanitizePhone)(phone);

  function handleClick(event) {
    log({
      eventType: 'C',
      result: result,
      eventCategory: 'Call',
      eventAction: 'click',
      snippetId: snippetId
    });
    onClick && onClick(event, result);
  }

  return _react2['default'].createElement(
    'a',
    require('../../../.babelhelper.js')['extends']({
      href: url,
      className: 'ola-cta-button ola-btn-call',
      onClick: handleClick
    }, rest),
    label || translate('call_label')
  );
};

module.exports = (0, _OlaLogger2['default'])((0, _OlaTranslate2['default'])(Phone));
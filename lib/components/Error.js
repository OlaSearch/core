'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _OlaTranslate = require('./../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var Error = function Error(_ref) {
  var error = _ref.error;
  var translate = _ref.translate;

  if (!error) return null;

  var message;
  var title;
  switch (error.status) {
    case 404:
      title = translate('error_404_title');
      message = translate('error_404_description');
      break;

    default:
      title = translate('error_general_title');
      message = translate('error_general_description');
      break;
  }

  return _react2['default'].createElement(
    'div',
    { className: 'ola-error' },
    _react2['default'].createElement(
      'h2',
      null,
      title
    ),
    message
  );
};

module.exports = (0, _OlaTranslate2['default'])(Error);
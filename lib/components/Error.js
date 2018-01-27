'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withTranslate = require('./../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Error(_ref) {
  var error = _ref.error,
      translate = _ref.translate;

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
}

module.exports = (0, _withTranslate2['default'])(Error);
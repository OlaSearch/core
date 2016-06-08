'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Error = function Error(_ref) {
  var error = _ref.error;
  var title = _ref.title;

  if (!error) return null;

  var message = '';

  switch (error.status) {
    case 404:
      message = '404 The page cannot be found';
      break;

    default:
      message = 'Something went wrong. Please email support@olasearch.com.';
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

Error.defaultProps = {
  title: 'Something went wrong'
};

module.exports = Error;
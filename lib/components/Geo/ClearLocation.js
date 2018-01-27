'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Context = require('./../../actions/Context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(
  'span',
  null,
  'Clear'
);

var ClearLocation = function ClearLocation(_ref) {
  var removeContextLocation = _ref.removeContextLocation,
      onSuccess = _ref.onSuccess;

  function handleClick() {
    removeContextLocation();
    onSuccess && onSuccess();
  }
  return _react2['default'].createElement(
    'button',
    {
      className: 'ola-link-geo ola-link-geo-clear',
      onClick: handleClick
    },
    _ref2
  );
};

module.exports = (0, _reactRedux.connect)(null, { removeContextLocation: _Context.removeContextLocation })(ClearLocation);
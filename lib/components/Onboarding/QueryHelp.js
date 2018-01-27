'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(
  'div',
  { className: 'ola-query-help' },
  'You can use long queries such as :',
  ' ',
  _react2['default'].createElement(
    'strong',
    null,
    'what is the gdp of cambodia and thailand in the last 3 years'
  )
);

function QueryHelp(_ref) {
  var isNewUser = _ref.isNewUser;

  if (!isNewUser) return null;
  return _ref2;
}

function mapStateToProps(state) {
  return {
    isNewUser: state.Context.isNewUser
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)(QueryHelp);
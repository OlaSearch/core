'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../utilities');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

module.exports = function (WrappedComponent) {
  var WithTranslate = function WithTranslate(props, context) {
    return _react2['default'].createElement(WrappedComponent, _extends({}, props, { translate: context.translate }));
  };
  WithTranslate.displayName = 'withTranslate(' + (0, _utilities.getComponentDisplayName)(WrappedComponent) + ')';
  WithTranslate.contextTypes = {
    translate: _react2['default'].PropTypes.func
  };
  return (0, _hoistNonReactStatics2['default'])(WithTranslate, WrappedComponent);
};
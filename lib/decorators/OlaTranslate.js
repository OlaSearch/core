'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utilities = require('./../utilities');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

module.exports = function (WrappedComponent) {
  var WithTranslate = function WithTranslate(props, context) {
    return _react2['default'].createElement(WrappedComponent, (0, _extends3['default'])({}, props, { translate: context.translate }));
  };
  WithTranslate.displayName = 'withTranslate(' + (0, _utilities.getComponentDisplayName)(WrappedComponent) + ')';
  WithTranslate.contextTypes = {
    translate: _propTypes2['default'].func
  };
  return (0, _hoistNonReactStatics2['default'])(WithTranslate, WrappedComponent);
};
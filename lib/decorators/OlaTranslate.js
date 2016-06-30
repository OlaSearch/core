'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../utilities');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = require('../../.babelhelper.js').interopRequireDefault(_hoistNonReactStatics);

module.exports = function (WrappedComponent) {
  var WithTranslate = function WithTranslate(props, context) {
    return _react2['default'].createElement(WrappedComponent, require('../../.babelhelper.js')['extends']({}, props, { translate: context.translate }));
  };
  WithTranslate.displayName = 'withTranslate(' + (0, _utilities.getComponentDisplayName)(WrappedComponent) + ')';
  WithTranslate.contextTypes = {
    translate: _react2['default'].PropTypes.func
  };
  return (0, _hoistNonReactStatics2['default'])(WithTranslate, WrappedComponent);
};
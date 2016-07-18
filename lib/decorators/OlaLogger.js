'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../utilities');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = require('../../.babelhelper.js').interopRequireDefault(_hoistNonReactStatics);

var _Logger = require('./../actions/Logger');

module.exports = function (WrappedComponent) {
  var WithLogger = function (_React$Component) {
    require('../../.babelhelper.js').inherits(WithLogger, _React$Component);

    function WithLogger() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      require('../../.babelhelper.js').classCallCheck(this, WithLogger);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = require('../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(WithLogger)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.log = function (params) {
        return _this.context.store.dispatch((0, _Logger.log)(params));
      }, _temp), require('../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
    }

    require('../../.babelhelper.js').createClass(WithLogger, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(WrappedComponent, require('../../.babelhelper.js')['extends']({}, props, { log: _Logger.log }));
      }
    }]);

    return WithLogger;
  }(_react2['default'].Component);

  WithLogger.displayName = 'withLogger(' + (0, _utilities.getComponentDisplayName)(WrappedComponent) + ')';
  WithLogger.contextTypes = {
    store: _react2['default'].PropTypes.object
  };
  return (0, _hoistNonReactStatics2['default'])(WithLogger, WrappedComponent);
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports['default'] = injectTranslate;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

function injectTranslate(WrappedComponent) {
  var WithTranslate = function (_React$Component) {
    _inherits(WithTranslate, _React$Component);

    function WithTranslate() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, WithTranslate);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(WithTranslate)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.translate = function (key, placeholders) {
        var result = (0, _utilities.translateKey)(key, _this.context.translations['messages']);
        if (typeof placeholders === 'undefined') {
          return result;
        }
        return (0, _utilities.supplant)(result, placeholders);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(WithTranslate, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(WrappedComponent, _extends({}, this.props, { translate: this.translate }));
      }
    }]);

    return WithTranslate;
  }(_react2['default'].Component);

  WithTranslate.displayName = 'withTranslate(' + (0, _utilities.getComponentDisplayName)(WrappedComponent) + ')';
  WithTranslate.contextTypes = {
    translations: _react2['default'].PropTypes.object
  };

  return WithTranslate;
}
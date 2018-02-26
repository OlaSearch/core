'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _equals = require('ramda/src/equals');

var _equals2 = _interopRequireDefault(_equals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ContentEditable = function (_React$Component) {
  (0, _inherits3['default'])(ContentEditable, _React$Component);

  function ContentEditable() {
    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, ContentEditable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.updateFakeEl = function () {
      _this.fakeEl.innerHTML = _this.props.formatValue ? _this.props.formatValue(_this.props.value) : _this.props.value;
    }, _this.registerFakeRef = function (el) {
      _this.fakeEl = el;
    }, _this.registerRef = function (el) {
      _this._input = el;
      _this.props.innerRef && _this.props.innerRef(el);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  ContentEditable.prototype.componentDidMount = function componentDidMount() {
    this.updateFakeEl();
  };

  ContentEditable.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.updateFakeEl();
  };

  ContentEditable.prototype.render = function render() {
    var _props = this.props,
        formatValue = _props.formatValue,
        onMatchChange = _props.onMatchChange,
        value = _props.value,
        placeholder = _props.placeholder,
        innerRef = _props.innerRef,
        rest = (0, _objectWithoutProperties3['default'])(_props, ['formatValue', 'onMatchChange', 'value', 'placeholder', 'innerRef']);
    /* iOS 8 bug where placeholder is displayed even when value is not empty */

    return _react2['default'].createElement(
      'div',
      { className: 'ContentEditableWrapper' },
      _react2['default'].createElement('input', (0, _extends3['default'])({
        type: 'text',
        className: 'ola-text-input ola-text-input-round',
        ref: this.registerRef
      }, rest, {
        value: value,
        placeholder: value ? '' : placeholder
      })),
      _react2['default'].createElement('div', {
        ref: this.registerFakeRef,
        contentEditable: true,
        readOnly: true,
        className: 'ContentEditable-Fake',
        tabIndex: -1
      })
    );
  };

  return ContentEditable;
}(_react2['default'].Component);

ContentEditable.defaultProps = {
  formatValue: null
};
exports['default'] = ContentEditable;
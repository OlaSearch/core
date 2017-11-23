'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ContentEditable = function (_React$Component) {
  (0, _inherits3['default'])(ContentEditable, _React$Component);

  function ContentEditable() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, ContentEditable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = ContentEditable.__proto__ || (0, _getPrototypeOf2['default'])(ContentEditable)).call.apply(_ref, [this].concat(args))), _this), _this.emitChange = function (event) {
      if (!_this.el) return;
      var text = _this.el.textContent;
      if (_this.props.onChange && text !== _this.lastText) {
        _this.props.onChange(text);
      }
      _this.lastText = text;
      _this.updateFakeEl(text);
    }, _this.updateFakeEl = function (text) {
      _this.fakeEl.innerHTML = _this.props.formatValue ? _this.props.formatValue(text) : text;
    }, _this.registerRef = function (el) {
      _this.el = el;
    }, _this.registerFakeRef = function (el) {
      _this.fakeEl = el;
    }, _this.createMarkup = function () {
      return { __html: _this.props.value };
    }, _this.onKeyDown = function (evt) {
      if (_this.props.onKeyDown) return _this.props.onKeyDown(evt);
      if (evt.which === 13) {
        evt && evt.preventDefault();
        _this.props.onSubmit && _this.props.onSubmit(_this.props.value, evt);
      }
    }, _this.onFocus = function (event) {
      var newEvent = (0, _extends3['default'])({}, event, {
        target: (0, _extends3['default'])({}, event.target, {
          value: _this.props.value
        })
      });
      _this.props.onFocus && _this.props.onFocus(newEvent);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(ContentEditable, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.el && this.props.value !== this.el.textContent) {
        this.el.textContent = this.props.value;
        /* Check if its active element */
        if (document && document.activeElement === this.el) {
          console.log('called');
        }
      }
      this.updateFakeEl(this.el.textContent);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateFakeEl(this.el.textContent);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // We need not rerender if the change of props simply reflects the user's
      // edits. Rerendering in this case would make the cursor/caret jump.
      return (
        // Rerender if there is no element yet... (somehow?)
        !this.el ||
        // ...or if html really changed... (programmatically, not by user edit)
        nextProps.value !== this.el.textContent && nextProps.value !== this.props.value ||
        // ...or if editing is enabled or disabled.
        this.props.disabled !== nextProps.disabled ||
        // ...or if className changed
        this.props.className !== nextProps.className
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          formatValue = _props.formatValue,
          value = _props.value,
          rest = (0, _objectWithoutProperties3['default'])(_props, ['formatValue', 'value']);


      return _react2['default'].createElement(
        'div',
        { className: 'ContentEditableWrapper' },
        _react2['default'].createElement('div', (0, _extends3['default'])({}, rest, {
          ref: this.registerRef,
          contentEditable: true,
          onFocus: this.onFocus,
          onInput: this.emitChange,
          onKeyDown: this.onKeyDown,
          className: 'ContentEditable-Input'
        })),
        _react2['default'].createElement('div', {
          ref: this.registerFakeRef,
          contentEditable: true,
          readOnly: true,
          className: 'ContentEditable-Fake',
          tabIndex: -1
        })
      );
    }
  }]);
  return ContentEditable;
}(_react2['default'].Component);

ContentEditable.defaultProps = {
  formatValue: null,
  onChange: null,
  onSubmit: null
};
exports['default'] = ContentEditable;
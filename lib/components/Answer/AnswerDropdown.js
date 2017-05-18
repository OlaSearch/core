'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var AnswerDropdown = function (_React$Component) {
  _inherits(AnswerDropdown, _React$Component);

  function AnswerDropdown(props) {
    _classCallCheck(this, AnswerDropdown);

    var _this = _possibleConstructorReturn(this, (AnswerDropdown.__proto__ || Object.getPrototypeOf(AnswerDropdown)).call(this, props));

    _this.toggle = function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    };

    _this.handleClickOutside = function () {
      if (_this.state.isOpen) {
        _this.setState({
          isOpen: false
        });
      }
    };

    _this.onChange = function (option, index) {
      _this.props.onChange(option, index, _this.props.item);
      _this.handleClickOutside();
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  _createClass(AnswerDropdown, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          active = _props.active,
          options = _props.options;
      var isOpen = this.state.isOpen;

      if (!options) return null;
      var label = options[this.props.active].name;
      if (options.length < 2) return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-label' },
        label
      );
      var klass = (0, _classnames2['default'])('ola-answer-dropdown', {
        'ola-answer-dropdown-active': isOpen
      });
      return _react2['default'].createElement(
        'div',
        { className: klass },
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-dropdown-label', onClick: this.toggle },
          label
        ),
        isOpen ? _react2['default'].createElement(
          'div',
          { className: 'ola-answer-dropdown-box' },
          options.map(function (option, idx) {
            return _react2['default'].createElement(AnswerDropdownItem, {
              onChange: _this2.onChange,
              key: idx,
              option: option,
              isActive: active === idx,
              index: idx
            });
          })
        ) : null
      );
    }
  }]);

  return AnswerDropdown;
}(_react2['default'].Component);

/**
 * Dropdown Item
 */


var AnswerDropdownItem = function AnswerDropdownItem(props) {
  function handleClick() {
    props.onChange(props.option, props.index);
  }
  var _props$option = props.option,
      name = _props$option.name,
      exists = _props$option.exists,
      isActive = props.isActive;

  if (isActive) return null;
  if (exists) return _react2['default'].createElement(
    'a',
    { className: 'ola-answer-dropdown-item', onClick: handleClick },
    name
  );
  return _react2['default'].createElement(
    'span',
    {
      className: 'ola-answer-dropdown-item ola-answer-dropdown-item-inactive'
    },
    name
  );
};

module.exports = (0, _reactOnclickoutside2['default'])(AnswerDropdown);
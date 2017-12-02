'use strict';

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _OlaToggle = require('./../../decorators/OlaToggle');

var _OlaToggle2 = _interopRequireDefault(_OlaToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerDropdown = function (_React$Component) {
  (0, _inherits3['default'])(AnswerDropdown, _React$Component);

  function AnswerDropdown() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, AnswerDropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = AnswerDropdown.__proto__ || (0, _getPrototypeOf2['default'])(AnswerDropdown)).call.apply(_ref, [this].concat(args))), _this), _this.handleClickOutside = function () {
      _this.props.toggleDisplay();
    }, _this.onChange = function (option, index) {
      _this.props.onChange(option, index, _this.props.item);
      _this.handleClickOutside();
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(AnswerDropdown, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          active = _props.active,
          options = _props.options,
          isCollapsed = _props.isCollapsed,
          toggleDisplay = _props.toggleDisplay;

      if (!options) return null;
      var label = options[this.props.active].name;
      if (options.length < 2) {
        return _react2['default'].createElement(
          'div',
          { className: 'ola-answer-label' },
          label
        );
      }
      var klass = (0, _classnames2['default'])('ola-answer-dropdown', {
        'ola-answer-dropdown-active': isCollapsed
      });
      return _react2['default'].createElement(
        'div',
        { className: klass },
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-dropdown-label', onClick: toggleDisplay },
          label
        ),
        isCollapsed ? _react2['default'].createElement(
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


function AnswerDropdownItem(props) {
  function handleClick() {
    props.onChange(props.option, props.index);
  }
  var _props$option = props.option,
      name = _props$option.name,
      exists = _props$option.exists,
      isActive = props.isActive;

  if (isActive) return null;
  if (exists) {
    return _react2['default'].createElement(
      'a',
      { className: 'ola-answer-dropdown-item', onClick: handleClick },
      name
    );
  }
  return _react2['default'].createElement(
    'span',
    { className: 'ola-answer-dropdown-item ola-answer-dropdown-item-inactive' },
    name
  );
}

module.exports = (0, _reactOnclickoutside2['default'])((0, _OlaToggle2['default'])(AnswerDropdown));
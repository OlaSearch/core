'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = require('../../../.babelhelper.js').interopRequireDefault(_reactOnclickoutside);

var AnswerDropdown = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(AnswerDropdown, _React$Component);

  function AnswerDropdown(props) {
    require('../../../.babelhelper.js').classCallCheck(this, AnswerDropdown);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(AnswerDropdown).call(this, props));

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

  require('../../../.babelhelper.js').createClass(AnswerDropdown, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var active = _props.active;
      var options = _props.options;
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


var AnswerDropdownItem = function (_React$Component2) {
  require('../../../.babelhelper.js').inherits(AnswerDropdownItem, _React$Component2);

  function AnswerDropdownItem() {
    var _Object$getPrototypeO;

    var _temp, _this3, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, AnswerDropdownItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AnswerDropdownItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this3), _this3.handleClick = function () {
      return _this3.props.onChange(_this3.props.option, _this3.props.index);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this3, _ret);
  }

  require('../../../.babelhelper.js').createClass(AnswerDropdownItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var _props2$option = _props2.option;
      var name = _props2$option.name;
      var exists = _props2$option.exists;
      var isActive = _props2.isActive;

      if (isActive) return null;
      if (exists) return _react2['default'].createElement(
        'a',
        { className: 'ola-answer-dropdown-item', onClick: this.handleClick },
        name
      );
      return _react2['default'].createElement(
        'span',
        { className: 'ola-answer-dropdown-item ola-answer-dropdown-item-inactive' },
        name
      );
    }
  }]);

  return AnswerDropdownItem;
}(_react2['default'].Component);

module.exports = (0, _reactOnclickoutside2['default'])(AnswerDropdown);
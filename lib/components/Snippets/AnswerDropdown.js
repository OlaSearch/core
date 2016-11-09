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

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  require('../../../.babelhelper.js').createClass(AnswerDropdown, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var active = _props.active;
      var items = _props.items;
      var isOpen = this.state.isOpen;

      if (!items) return null;
      var label = this.props.items[this.props.active].name;
      if (items.length < 2) return _react2['default'].createElement(
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
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-dropdown-box' },
          items.map(function (item, idx) {
            return _react2['default'].createElement(AnswerDropdownItem, { key: idx, item: item, isActive: active === idx });
          })
        )
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

    var _temp, _this2, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, AnswerDropdownItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AnswerDropdownItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this2), _this2.handleClick = function () {
      return _this2.props.onSelect(_this2.props.item);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this2, _ret);
  }

  require('../../../.babelhelper.js').createClass(AnswerDropdownItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var name = _props2.item.name;
      var isActive = _props2.isActive;

      if (isActive) return _react2['default'].createElement(
        'span',
        { className: 'ola-answer-dropdown-item' },
        name
      );
      return _react2['default'].createElement(
        'a',
        { className: 'ola-answer-dropdown-item', onClick: this.handleClick },
        name
      );
    }
  }]);

  return AnswerDropdownItem;
}(_react2['default'].Component);

module.exports = (0, _reactOnclickoutside2['default'])(AnswerDropdown);
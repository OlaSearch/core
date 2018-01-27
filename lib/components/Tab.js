'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Tab = function (_React$Component) {
  (0, _inherits3['default'])(Tab, _React$Component);

  function Tab(props) {
    (0, _classCallCheck3['default'])(this, Tab);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.setActiveTab = function (value) {
      _this.setState({
        activeTab: _this.props.toggle && !_this.props.showOne ? _this.state.activeTab.indexOf(value) !== -1 ? _this.state.activeTab.filter(function (id) {
          return id !== value;
        }) : [].concat(_this.state.activeTab, [value]) : [value]
      });
    };

    _this.handleClick = function (tab) {
      _this.setActiveTab(tab, toggle, showOne);
    };

    _this.state = {
      activeTab: [0]
    };
    return _this;
  }

  Tab.prototype.render = function render() {
    var toggle = this.props.toggle;

    var labels = this.props.children.map(function (child) {
      return child.props.title;
    });
    return _react2['default'].createElement(
      'div',
      null,
      toggle ? null : _react2['default'].createElement(
        'nav',
        null,
        labels.map(function (label, index) {
          var isActive = activeTab[0] === index;
          return _react2['default'].createElement(TabLabel, {
            label: labels,
            index: index,
            key: index,
            onClick: handleClick,
            isActive: isActive
          });
        })
      ),
      _react2['default'].createElement(
        'div',
        null,
        children.map(function (child, index) {
          var isActive = toggle ? activeTab.indexOf(index) !== -1 : index === activeTab[0];
          return _react2['default'].createElement(
            'div',
            null,
            toggle ? _react2['default'].createElement(TabLabel, {
              label: labels[index],
              index: index,
              onClick: handleClick,
              isActive: isActive
            }) : null,
            isActive ? child : null
          );
        })
      )
    );
  };

  return Tab;
}(_react2['default'].Component);

/**
 * Tab Label
 */


Tab.defaultProps = {
  toggle: false,
  showOne: false
};
var TabLabel = function TabLabel(_ref) {
  var _cx;

  var label = _ref.label,
      index = _ref.index,
      isActive = _ref.isActive,
      onClick = _ref.onClick;

  function handleClick() {
    onClick(index);
  }
  var className = (0, _classnames2['default'])('tabLabelClassName', (_cx = {}, _cx['tabLabelActiveClassName'] = isActive, _cx));
  return _react2['default'].createElement(
    'button',
    { className: className, onClick: handleClick },
    label
  );
};

exports['default'] = Tab;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _Search = require('./../../actions/Search');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var RangeNumericFilter = function (_React$Component) {
  _inherits(RangeNumericFilter, _React$Component);

  function RangeNumericFilter() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, RangeNumericFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RangeNumericFilter)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (from, to) {
      var _this$props = _this.props;
      var facet = _this$props.facet;
      var dispatch = _this$props.dispatch;


      if (typeof from === 'undefined' || typeof to === 'undefined') {
        dispatch((0, _Search.removeFacet)(facet));
      } else {
        dispatch((0, _Search.replaceFacet)(facet, [from, to]));
      }
      dispatch((0, _Search.executeSearch)());
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RangeNumericFilter, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var facet = _props.facet;
      var isCollapsed = _props.isCollapsed;
      var toggleDisplay = _props.toggleDisplay;
      var displayName = facet.displayName;
      var values = facet.values;


      var klass = (0, _classnames2['default'])({
        'ola-facet': true,
        'ola-facet-collapsed': isCollapsed
      });
      return _react2['default'].createElement(
        'div',
        { className: klass },
        _react2['default'].createElement(
          'h4',
          { className: 'ola-facet-title', onClick: toggleDisplay },
          displayName
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ola-facet-wrapper' },
          _react2['default'].createElement(
            'div',
            { className: 'ola-facet-list' },
            values.map(function (value, idx) {
              return _react2['default'].createElement(RangeNumericItem, {
                value: value,
                handleClick: _this2.handleClick,
                key: idx
              });
            })
          )
        )
      );
    }
  }]);

  return RangeNumericFilter;
}(_react2['default'].Component);

/**
 * Numeric item
 */


var RangeNumericItem = function (_React$Component2) {
  _inherits(RangeNumericItem, _React$Component2);

  function RangeNumericItem() {
    var _Object$getPrototypeO2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, RangeNumericItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(RangeNumericItem)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.handleClick = function () {
      var value = _this3.props.value;
      var from = value.from;
      var to = value.to;

      _this3.props.handleClick(from, to);
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(RangeNumericItem, [{
    key: 'render',
    value: function render() {
      var value = this.props.value;
      var count = value.count;
      var name = value.name;

      var itemKlass = (0, _classnames2['default'])('ola-btn', 'ola-facet-link', { 'ola-facet-link-active': false });
      return _react2['default'].createElement(
        'div',
        {
          className: itemKlass,
          onClick: this.handleClick
        },
        _react2['default'].createElement(
          'span',
          { className: 'ola-search-facet-count' },
          count
        ),
        _react2['default'].createElement(
          'span',
          { className: 'ola-search-facet-name' },
          name
        )
      );
    }
  }]);

  return RangeNumericItem;
}(_react2['default'].Component);

module.exports = (0, _OlaFacetToggle.facetToggle)(RangeNumericFilter);
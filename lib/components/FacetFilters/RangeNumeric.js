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

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = _interopRequireDefault(_OlaFacetToggle);

var _Search = require('./../../actions/Search');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RangeNumericFilter = function (_React$Component) {
  (0, _inherits3['default'])(RangeNumericFilter, _React$Component);

  function RangeNumericFilter() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, RangeNumericFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = RangeNumericFilter.__proto__ || (0, _getPrototypeOf2['default'])(RangeNumericFilter)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (from, to) {
      var _this$props = _this.props,
          facet = _this$props.facet,
          dispatch = _this$props.dispatch;


      if (typeof from === 'undefined' || typeof to === 'undefined') {
        dispatch((0, _Search.removeFacet)(facet));
      } else {
        dispatch((0, _Search.replaceFacet)(facet, [from, to]));
      }
      dispatch((0, _Search.executeSearch)());
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(RangeNumericFilter, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          facet = _props.facet,
          isCollapsed = _props.isCollapsed,
          toggleDisplay = _props.toggleDisplay;
      var displayName = facet.displayName,
          values = facet.values;


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
  (0, _inherits3['default'])(RangeNumericItem, _React$Component2);

  function RangeNumericItem() {
    var _ref2;

    var _temp2, _this3, _ret2;

    (0, _classCallCheck3['default'])(this, RangeNumericItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = (0, _possibleConstructorReturn3['default'])(this, (_ref2 = RangeNumericItem.__proto__ || (0, _getPrototypeOf2['default'])(RangeNumericItem)).call.apply(_ref2, [this].concat(args))), _this3), _this3.handleClick = function () {
      var value = _this3.props.value;
      var from = value.from,
          to = value.to;

      _this3.props.handleClick(from, to);
    }, _temp2), (0, _possibleConstructorReturn3['default'])(_this3, _ret2);
  }

  (0, _createClass3['default'])(RangeNumericItem, [{
    key: 'render',
    value: function render() {
      var value = this.props.value;
      var count = value.count,
          name = value.name;

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

module.exports = (0, _OlaFacetToggle2['default'])(RangeNumericFilter);
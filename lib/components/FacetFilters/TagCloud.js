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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TagCloud = function (_React$Component) {
  (0, _inherits3['default'])(TagCloud, _React$Component);

  function TagCloud() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, TagCloud);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = TagCloud.__proto__ || (0, _getPrototypeOf2['default'])(TagCloud)).call.apply(_ref, [this].concat(args))), _this), _this.handleAddFacet = function (value) {
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          facet = _this$props.facet;

      dispatch((0, _Search.addFacet)(facet, value));
      dispatch((0, _Search.executeSearch)());
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(TagCloud, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          facet = _props.facet,
          selected = _props.selected,
          isCollapsed = _props.isCollapsed,
          toggleDisplay = _props.toggleDisplay,
          fontSizeMin = _props.fontSizeMin,
          fontSizeMax = _props.fontSizeMax,
          showSelectedFacetItem = _props.showSelectedFacetItem;
      var values = facet.values;

      var counts = values.map(function (value) {
        return value.count;
      });
      var max = Math.max.apply(this, counts);
      var min = Math.min.apply(this, counts);

      var klass = (0, _classnames2['default'])({
        'ola-facet': true,
        'ola-facet-collapsed': isCollapsed
      });

      if (!showSelectedFacetItem) values = values.filter(function (item) {
        return selected.indexOf(item.name) === -1;
      });

      if (!values.length) return null;
      return _react2['default'].createElement(
        'div',
        { className: klass },
        _react2['default'].createElement(
          'h4',
          { className: 'ola-facet-title', onClick: toggleDisplay },
          facet.displayName
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ola-facet-wrapper' },
          values.map(function (value, idx) {
            return _react2['default'].createElement(TagCloudItem, {
              key: idx,
              value: value,
              min: min,
              max: max,
              fontSizeMax: fontSizeMax,
              fontSizeMin: fontSizeMin,
              onSelect: _this2.handleAddFacet
            });
          })
        )
      );
    }
  }]);
  return TagCloud;
}(_react2['default'].Component);

/**
 * Tag cloud item
 */


TagCloud.defaultProps = {
  fontSizeMin: 16,
  fontSizeMax: 24,
  showSelectedFacetItem: false
};

var TagCloudItem = function (_React$Component2) {
  (0, _inherits3['default'])(TagCloudItem, _React$Component2);

  function TagCloudItem() {
    var _ref2;

    var _temp2, _this3, _ret2;

    (0, _classCallCheck3['default'])(this, TagCloudItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = (0, _possibleConstructorReturn3['default'])(this, (_ref2 = TagCloudItem.__proto__ || (0, _getPrototypeOf2['default'])(TagCloudItem)).call.apply(_ref2, [this].concat(args))), _this3), _this3.handleClick = function () {
      _this3.props.onSelect(_this3.props.value.name);
    }, _temp2), (0, _possibleConstructorReturn3['default'])(_this3, _ret2);
  }

  (0, _createClass3['default'])(TagCloudItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          _props2$value = _props2.value,
          name = _props2$value.name,
          count = _props2$value.count,
          min = _props2.min,
          max = _props2.max,
          fontSizeMin = _props2.fontSizeMin,
          fontSizeMax = _props2.fontSizeMax;

      var size = count === min ? fontSizeMin : count / max * (fontSizeMax - fontSizeMin) + fontSizeMin;
      return _react2['default'].createElement(
        'button',
        {
          className: 'ola-btn-tag',
          style: { fontSize: size + 'px' },
          onClick: this.handleClick },
        name
      );
    }
  }]);
  return TagCloudItem;
}(_react2['default'].Component);

module.exports = (0, _OlaFacetToggle2['default'])(TagCloud);
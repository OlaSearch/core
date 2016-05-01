'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Tabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Tabs)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleReplaceFacet = function (facet, value) {
      /**
       * Remove facets that are not in this tab
       */

      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var resetFacetsOnSelect = _this$props.resetFacetsOnSelect;


      if (resetFacetsOnSelect) dispatch((0, _Search.removeAllFacets)());

      dispatch((0, _Search.replaceFacet)(facet, value));

      dispatch((0, _Search.executeSearch)());
    }, _this.handleRemoveFacet = function (facet) {
      var _this$props2 = _this.props;
      var dispatch = _this$props2.dispatch;
      var resetFacetsOnSelect = _this$props2.resetFacetsOnSelect;


      if (resetFacetsOnSelect) dispatch((0, _Search.removeAllFacets)());

      dispatch((0, _Search.removeFacet)(facet));

      dispatch((0, _Search.executeSearch)());
    }, _this.getTabsForDisplay = function (tab, values) {
      var tabsToDisplay = tab.tabsToDisplay;


      (0, _invariant2['default'])(tabsToDisplay, 'tabsToDisplay is required. It should be part of the individual facet');

      var tabs = [];

      for (var i = 0; i < tabsToDisplay.length; i++) {
        var _tab = values.filter(function (item) {
          return item.name === tabsToDisplay[i];
        });

        if (_tab.length) {
          tabs.push({
            name: _tab[0].name,
            count: _tab[0].count
          });
        } else {
          tabs.push({
            name: tabsToDisplay[i],
            count: 0
          });
        }
      }

      return tabs;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tabs, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var facets = _props.facets;
      var selected = _props.selected;


      var facet = _ramda2['default'].find(_ramda2['default'].propEq('tab', true))(facets);

      /* Return null if there is no facets */

      if (!facet) return null;

      var values = facet.values;

      var tabs = this.getTabsForDisplay(facet, values);

      var selectedFacets = selected.filter(function (item) {
        return item.name === facet.name;
      }).map(function (item) {
        return item.selected;
      });
      var selectedItems = _ramda2['default'].flatten(selectedFacets);

      /* Calculate Total for All Tab */

      var totalCount = values.reduce(function (acc, obj) {
        return acc + obj.count;
      }, 0);

      /* Class for all tab */

      var isAllSelected = !selectedFacets.length;

      var klassTab = (0, _classnames2['default'])({
        'ola-tabs-label': true,
        'ola-tab-active': isAllSelected
      });

      return _react2['default'].createElement(
        'nav',
        { className: 'ola-tabs' },
        _react2['default'].createElement(
          'a',
          {
            className: klassTab,
            onClick: function onClick() {
              if (!isAllSelected) _this2.handleRemoveFacet(facet);
            }
          },
          'All',
          _react2['default'].createElement(
            'span',
            { className: 'ola-search-facet-count' },
            totalCount
          )
        ),
        tabs.map(function (value, idx) {
          var isActive = selectedItems.indexOf(value.name) !== -1;
          return _react2['default'].createElement(TabItem, {
            key: idx,
            facet: facet,
            value: value,
            handleClick: _this2.handleReplaceFacet,
            isActive: isActive
          });
        })
      );
    }
  }]);

  return Tabs;
}(_react2['default'].Component);

/**
 * Tab Item
 */


Tabs.propTypes = {
  facets: _react2['default'].PropTypes.array.isRequired,
  selected: _react2['default'].PropTypes.array.isRequired,
  dispatch: _react2['default'].PropTypes.func.isRequired,
  resetFacetsOnSelect: _react2['default'].PropTypes.bool
};
Tabs.defaultProps = {
  resetFacetsOnSelect: true
};

var TabItem = function (_React$Component2) {
  _inherits(TabItem, _React$Component2);

  function TabItem() {
    var _Object$getPrototypeO2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, TabItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(TabItem)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.handleClick = function () {
      var _this3$props = _this3.props;
      var facet = _this3$props.facet;
      var value = _this3$props.value;
      var isActive = _this3$props.isActive;
      var name = value.name;
      var count = value.count;

      if (!isActive && count) _this3.props.handleClick(facet, name);
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(TabItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var isActive = _props2.isActive;
      var value = _props2.value;
      var facet = _props2.facet;
      var name = value.name;
      var count = value.count;
      var facetNames = facet.facetNames;

      var klass = (0, _classnames2['default'])({
        'ola-tabs-label': true,
        'ola-tab-active': isActive
      });
      return _react2['default'].createElement(
        'a',
        {
          className: klass,
          type: 'button',
          onClick: this.handleClick },
        _react2['default'].createElement(
          'span',
          { className: 'ola-tab-name' },
          (0, _utilities.getDisplayName)(facetNames, name)
        ),
        _react2['default'].createElement(
          'span',
          { className: 'ola-search-facet-count' },
          count
        )
      );
    }
  }]);

  return TabItem;
}(_react2['default'].Component);

module.exports = Tabs;
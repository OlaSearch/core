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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var TabsFilter = function (_React$Component) {
  _inherits(TabsFilter, _React$Component);

  function TabsFilter() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TabsFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TabsFilter)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleReplaceFacet = function (facet, value) {
      /**
       * Remove facets that are not in this tab
       */

      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var resetFacetsOnSelect = _this$props.resetFacetsOnSelect;


      if (resetFacetsOnSelect) dispatch((0, _Search.removeAllFacets)());

      dispatch((0, _Search.replaceFacet)(facet, value));

      _this.props.beforeSelect && _this.props.beforeSelect(facet, value);

      dispatch((0, _Search.executeSearch)());
    }, _this.handleRemoveFacet = function (facet) {
      var _this$props2 = _this.props;
      var dispatch = _this$props2.dispatch;
      var resetFacetsOnSelect = _this$props2.resetFacetsOnSelect;


      if (resetFacetsOnSelect) dispatch((0, _Search.removeAllFacets)());

      dispatch((0, _Search.removeFacet)(facet));

      _this.props.beforeSelect && _this.props.beforeSelect(facet);

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

  _createClass(TabsFilter, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var facets = _props.facets;
      var selected = _props.selected;


      var facet = (0, _ramda.find)((0, _ramda.propEq)('tab', true))(facets);

      /* Return null if there is no facets */

      if (!facet) return null;

      var values = facet.values;

      var tabs = this.getTabsForDisplay(facet, values);

      var selectedItems = (0, _ramda.flatten)(selected.filter(function (item) {
        return item.name === facet.name;
      }).map(function (item) {
        return item.selected;
      }));

      /* Calculate Total for All Tab */

      var totalCount = values.reduce(function (acc, obj) {
        return acc + obj.count;
      }, 0);

      /* Class for all tab */

      var isAllSelected = !selectedItems.length;

      return _react2['default'].createElement(
        'nav',
        { className: 'ola-tabs' },
        _react2['default'].createElement(TabItemAll, {
          isSelected: isAllSelected,
          facet: facet,
          totalCount: totalCount,
          handleClick: this.handleRemoveFacet
        }),
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

  return TabsFilter;
}(_react2['default'].Component);

/**
 * Tag Item All
 */

TabsFilter.propTypes = {
  facets: _react2['default'].PropTypes.array.isRequired,
  selected: _react2['default'].PropTypes.array.isRequired,
  dispatch: _react2['default'].PropTypes.func.isRequired,
  resetFacetsOnSelect: _react2['default'].PropTypes.bool
};
TabsFilter.defaultProps = {
  resetFacetsOnSelect: true
};

var TabItemAll = function (_React$Component2) {
  _inherits(TabItemAll, _React$Component2);

  function TabItemAll() {
    var _Object$getPrototypeO2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, TabItemAll);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(TabItemAll)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.handleClick = function () {
      if (!_this3.props.isSelected) _this3.props.handleClick(_this3.props.facet);
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(TabItemAll, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var isSelected = _props2.isSelected;
      var totalCount = _props2.totalCount;

      var klassTab = (0, _classnames2['default'])({
        'ola-tabs-label': true,
        'ola-tab-active': isSelected
      });
      return _react2['default'].createElement(
        'a',
        {
          className: klassTab,
          onClick: this.handleClick
        },
        'All',
        _react2['default'].createElement(
          'span',
          { className: 'ola-search-facet-count' },
          totalCount
        )
      );
    }
  }]);

  return TabItemAll;
}(_react2['default'].Component);

/**
 * Tab Item
 */


var TabItem = function (_React$Component3) {
  _inherits(TabItem, _React$Component3);

  function TabItem() {
    var _Object$getPrototypeO3;

    var _temp3, _this4, _ret3;

    _classCallCheck(this, TabItem);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this4 = _possibleConstructorReturn(this, (_Object$getPrototypeO3 = Object.getPrototypeOf(TabItem)).call.apply(_Object$getPrototypeO3, [this].concat(args))), _this4), _this4.handleClick = function () {
      var _this4$props = _this4.props;
      var facet = _this4$props.facet;
      var value = _this4$props.value;
      var isActive = _this4$props.isActive;
      var name = value.name;
      var count = value.count;

      if (!isActive && count) _this4.props.handleClick(facet, name);
    }, _temp3), _possibleConstructorReturn(_this4, _ret3);
  }

  _createClass(TabItem, [{
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var isActive = _props3.isActive;
      var value = _props3.value;
      var facet = _props3.facet;
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

module.exports = TabsFilter;
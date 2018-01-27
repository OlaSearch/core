'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Search = require('./../../actions/Search');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _flatten = require('ramda/src/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _propEq = require('ramda/src/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TabsFilter = function (_React$Component) {
  (0, _inherits3['default'])(TabsFilter, _React$Component);

  function TabsFilter() {
    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, TabsFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleReplaceFacet = function (facet, value) {
      /**
       * Remove facets that are not in this tab
       */
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          resetFacetsOnSelect = _this$props.resetFacetsOnSelect;


      if (resetFacetsOnSelect) dispatch((0, _Search.removeAllFacets)());

      dispatch((0, _Search.replaceFacet)(facet, value));

      _this.props.beforeSelect && _this.props.beforeSelect(facet, value);

      dispatch((0, _Search.executeSearch)());
    }, _this.handleRemoveFacet = function (facet) {
      var _this$props2 = _this.props,
          dispatch = _this$props2.dispatch,
          resetFacetsOnSelect = _this$props2.resetFacetsOnSelect;


      if (resetFacetsOnSelect) dispatch((0, _Search.removeAllFacets)());

      dispatch((0, _Search.removeFacet)(facet, null, true)); /* 3rd argument is to reset all facets: resetAllFacets */

      _this.props.beforeSelect && _this.props.beforeSelect(facet);

      dispatch((0, _Search.executeSearch)());
    }, _this.getTabsForDisplay = function (facet, values) {
      var tabsToDisplay = facet.tabsToDisplay;


      if (!tabsToDisplay) {
        throw new Error('tabsToDisplay is required. It should be part of the individual facet');
      }

      var tabs = [];

      var _loop = function _loop(i, len) {
        var tab = values.filter(function (item) {
          return item.name === tabsToDisplay[i];
        });

        if (tab.length) {
          tabs.push({
            name: tab[0].name,
            count: tab[0].count
          });
        } else {
          tabs.push({
            name: tabsToDisplay[i],
            count: 0
          });
        }
      };

      for (var i = 0, len = tabsToDisplay.length; i < len; i++) {
        _loop(i, len);
      }

      return tabs;
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  TabsFilter.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.facets !== nextProps.facets || this.props.selected !== nextProps.selected;
  };

  TabsFilter.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        facets = _props.facets,
        selected = _props.selected,
        name = _props.name,
        translate = _props.translate;


    var facet = (0, _find2['default'])((0, _propEq2['default'])('name', name))(facets);

    /* Return null if there is no facets */

    if (!facet) return null;

    var values = facet.values;

    var tabs = this.getTabsForDisplay(facet, values);
    var selectedItems = (0, _flatten2['default'])(selected.filter(function (item) {
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
        handleClick: this.handleRemoveFacet,
        label: translate('facet_tabs_all_label')
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
  };

  return TabsFilter;
}(_react2['default'].Component);

/**
 * Tag Item All
 */


TabsFilter.defaultProps = {
  resetFacetsOnSelect: true
};
function TabItemAll(_ref) {
  var isSelected = _ref.isSelected,
      totalCount = _ref.totalCount,
      label = _ref.label,
      handleClick = _ref.handleClick,
      facet = _ref.facet;

  function onClick() {
    if (!isSelected) handleClick(facet);
  }
  var klassTab = (0, _classnames2['default'])({
    'ola-tabs-label': true,
    'ola-tab-active': isSelected
  });
  return _react2['default'].createElement(
    'a',
    { className: klassTab, onClick: onClick },
    label,
    _react2['default'].createElement(
      'span',
      { className: 'ola-search-facet-count' },
      totalCount
    )
  );
}

/**
 * Tab Item
 */
function TabItem(_ref2) {
  var facet = _ref2.facet,
      value = _ref2.value,
      isActive = _ref2.isActive,
      handleClick = _ref2.handleClick;

  function onClick() {
    var name = value.name,
        count = value.count;

    if (!isActive && count) handleClick(facet, name);
  }
  var name = value.name,
      count = value.count;
  var facetNames = facet.facetNames;

  var klass = (0, _classnames2['default'])({
    'ola-tabs-label': true,
    'ola-tab-active': isActive
  });
  return _react2['default'].createElement(
    'a',
    { className: klass, type: 'button', onClick: onClick },
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

module.exports = (0, _withTranslate2['default'])(TabsFilter);
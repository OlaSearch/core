'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../actions/Search');

var _Tag = require('./Misc/Tag');

var _Tag2 = require('../../.babelhelper.js').interopRequireDefault(_Tag);

var _Tooltip = require('./Misc/Tooltip');

var _Tooltip2 = require('../../.babelhelper.js').interopRequireDefault(_Tooltip);

var _queryString = require('query-string');

var _queryString2 = require('../../.babelhelper.js').interopRequireDefault(_queryString);

var SelectedFilters = function (_React$Component) {
  require('../../.babelhelper.js').inherits(SelectedFilters, _React$Component);

  function SelectedFilters(props) {
    require('../../.babelhelper.js').classCallCheck(this, SelectedFilters);

    /* Parse queryString to get the referrer */
    var _this = require('../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(SelectedFilters).call(this, props));

    _this.handleRemoveFacet = function (facet, value) {
      var dispatch = _this.props.dispatch;


      if (facet.type === 'hierarchical') {
        dispatch((0, _Search.removeFacetItem)(facet));
      } else {
        dispatch((0, _Search.removeFacet)(facet, value));
      }
      dispatch((0, _Search.executeSearch)());
    };

    _this.closeGuidePopover = function () {
      _this.setState({
        showGuidePopover: false
      });
    };

    _this.onRemoveQueryTag = function () {
      var dispatch = _this.props.dispatch;

      dispatch((0, _Search.clearQueryTerm)());
      dispatch((0, _Search.executeSearch)());
    };

    _this.handleRemoveFilter = function (filter) {
      var dispatch = _this.props.dispatch;

      dispatch((0, _Search.removeFilter)(filter));
      dispatch((0, _Search.executeSearch)());
    };

    var qString = _queryString2['default'].parse(window.location.search);

    _this.state = {
      showGuidePopover: !!qString.referrer
    };
    return _this;
  }

  require('../../.babelhelper.js').createClass(SelectedFilters, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.facets !== nextProps.facets || this.props.q !== nextProps.q || this.props.filters !== nextProps.filters || this.state.showGuidePopover !== nextState.showGuidePopover;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var facets = _props.facets;
      var showQuery = _props.showQuery;
      var q = _props.q;
      var filters = _props.filters;
      var showZones = _props.showZones;
      var showTabs = _props.showTabs;
      var grouped = _props.grouped;
      var showGuidePopover = this.state.showGuidePopover;

      /* Remove tabs and zones */

      facets = facets.filter(function (item) {
        return (showTabs ? true : !item.tab) && (showZones ? true : !item.zone);
      });

      if (!facets.length && !q && !filters.length) return null;

      return _react2['default'].createElement(
        'div',
        { className: 'ola-facet-tags' },
        _react2['default'].createElement(_Tooltip2['default'], {
          isShown: showGuidePopover,
          onClose: this.closeGuidePopover
        }),
        showQuery && q ? _react2['default'].createElement(
          'div',
          { className: 'ola-facet-tag' },
          _react2['default'].createElement(
            'span',
            { className: 'ola-facet-tag-name' },
            q
          ),
          _react2['default'].createElement('button', { className: 'ola-facet-tag-remove', onClick: this.onRemoveQueryTag })
        ) : null,
        facets.map(function (facet, idx) {
          var tags = facet.selected;
          var displayName = facet.displayName;
          /* Error with babel-traverse */

          var _displayName = displayName ? _react2['default'].createElement(
            'span',
            { className: 'ola-facet-tags-heading' },
            displayName
          ) : null;
          if (!grouped) {
            return tags.map(function (value, index) {
              return _react2['default'].createElement(
                'div',
                { key: index, className: 'ola-facet-tags-group' },
                _displayName,
                _react2['default'].createElement(FacetItem, {
                  name: value,
                  facet: facet,
                  handleRemove: _this2.handleRemoveFacet
                })
              );
            });
          }
          return _react2['default'].createElement(
            'div',
            { key: idx, className: 'ola-facet-tags-group' },
            displayName && _react2['default'].createElement(
              'span',
              { className: 'ola-facet-tags-heading' },
              displayName
            ),
            tags.map(function (value, index) {
              return _react2['default'].createElement(FacetItem, {
                name: value,
                facet: facet,
                handleRemove: _this2.handleRemoveFacet,
                key: index
              });
            })
          );
        }),
        filters.map(function (filter, idx) {
          return _react2['default'].createElement(FilterItem, {
            filter: filter,
            handleRemove: _this2.handleRemoveFilter,
            key: idx
          });
        })
      );
    }
  }]);

  return SelectedFilters;
}(_react2['default'].Component);

/**
 * Selected Tag
 */

SelectedFilters.defaultProps = {
  showQuery: false,
  showTabs: true,
  showZones: true,
  grouped: true,
  filters: [],
  facets: []
};

var FacetItem = function (_React$Component2) {
  require('../../.babelhelper.js').inherits(FacetItem, _React$Component2);

  function FacetItem() {
    var _Object$getPrototypeO;

    var _temp, _this3, _ret;

    require('../../.babelhelper.js').classCallCheck(this, FacetItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = require('../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FacetItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this3), _this3.handleRemove = function () {
      _this3.props.handleRemove(_this3.props.facet, _this3.props.name);
    }, _temp), require('../../.babelhelper.js').possibleConstructorReturn(_this3, _ret);
  }

  require('../../.babelhelper.js').createClass(FacetItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var name = _props2.name;
      var facet = _props2.facet;

      if (facet.rootLevel && facet.rootLevel > 0) {
        name = name.split('/').slice(facet.rootLevel).join('/');
      }
      return _react2['default'].createElement(_Tag2['default'], {
        onRemove: this.handleRemove,
        name: name,
        facet: facet
      });
    }
  }]);

  return FacetItem;
}(_react2['default'].Component);

/**
 * Selected Tag
 */

var FilterItem = function (_React$Component3) {
  require('../../.babelhelper.js').inherits(FilterItem, _React$Component3);

  function FilterItem() {
    var _Object$getPrototypeO2;

    var _temp2, _this4, _ret2;

    require('../../.babelhelper.js').classCallCheck(this, FilterItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this4 = require('../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(FilterItem)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this4), _this4.handleRemove = function () {
      _this4.props.handleRemove(_this4.props.filter);
    }, _temp2), require('../../.babelhelper.js').possibleConstructorReturn(_this4, _ret2);
  }

  require('../../.babelhelper.js').createClass(FilterItem, [{
    key: 'render',
    value: function render() {
      var filter = this.props.filter;
      var name = filter.name;

      return _react2['default'].createElement(_Tag2['default'], {
        onRemove: this.handleRemove,
        name: name,
        facet: filter
      });
    }
  }]);

  return FilterItem;
}(_react2['default'].Component);

module.exports = SelectedFilters;
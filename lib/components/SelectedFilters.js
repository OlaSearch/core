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

var _Search = require('./../actions/Search');

var _Tag = require('./Misc/Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _Tooltip = require('./Misc/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SelectedFilters = function (_React$Component) {
  (0, _inherits3['default'])(SelectedFilters, _React$Component);

  function SelectedFilters(props) {
    (0, _classCallCheck3['default'])(this, SelectedFilters);

    /* Parse queryString to get the referrer */
    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

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

  SelectedFilters.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return this.props.facets !== nextProps.facets || this.props.q !== nextProps.q || this.props.filters !== nextProps.filters || this.state.showGuidePopover !== nextState.showGuidePopover;
  };

  SelectedFilters.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        facets = _props.facets,
        showQuery = _props.showQuery,
        q = _props.q,
        filters = _props.filters,
        showZones = _props.showZones,
        showTabs = _props.showTabs,
        grouped = _props.grouped;
    var showGuidePopover = this.state.showGuidePopover;

    /* Remove tabs and zones */

    facets = facets.filter(function (item) {
      return (showTabs ? true : !item.tab) && (showZones ? true : !item.zone);
    });

    if (!facets.length && !q && !filters.length) return null;

    return _react2['default'].createElement(
      'div',
      { className: 'ola-facet-tags' },
      _react2['default'].createElement(_Tooltip2['default'], { isShown: showGuidePopover, onClose: this.closeGuidePopover }),
      showQuery && q ? _react2['default'].createElement(
        'div',
        { className: 'ola-facet-tag' },
        _react2['default'].createElement(
          'span',
          { className: 'ola-facet-tag-name' },
          q
        ),
        _react2['default'].createElement('button', {
          className: 'ola-facet-tag-remove',
          onClick: this.onRemoveQueryTag
        })
      ) : null,
      facets.map(function (facet, idx) {
        var tags = facet.selected,
            displayName = facet.displayName;
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
  };

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
function FacetItem(_ref) {
  var facet = _ref.facet,
      name = _ref.name,
      handleRemove = _ref.handleRemove;

  function onRemove() {
    handleRemove(facet, name);
  }
  if (facet.rootLevel && facet.rootLevel > 0) {
    name = name.split('/').slice(facet.rootLevel).join('/');
  }
  return _react2['default'].createElement(_Tag2['default'], { onRemove: onRemove, name: name, facet: facet });
}

/**
 * Selected Tag
 */

function FilterItem(_ref2) {
  var filter = _ref2.filter,
      handleRemove = _ref2.handleRemove;

  function onRemove() {
    handleRemove(filter);
  }
  var name = filter.name;

  return _react2['default'].createElement(_Tag2['default'], { onRemove: onRemove, name: name, facet: filter });
}

module.exports = SelectedFilters;
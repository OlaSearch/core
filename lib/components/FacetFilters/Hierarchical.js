'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _withToggle = require('./../../decorators/withToggle');

var _withToggle2 = _interopRequireDefault(_withToggle);

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var _xssFilters = require('xss-filters');

var _xssFilters2 = _interopRequireDefault(_xssFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var HierarchicalFilter = function (_React$Component) {
  (0, _inherits3['default'])(HierarchicalFilter, _React$Component);

  function HierarchicalFilter(props) {
    (0, _classCallCheck3['default'])(this, HierarchicalFilter);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.onChangeFilterText = function (event) {
      _this.setState({
        filterText: _xssFilters2['default'].inHTMLData(event.target.value)
      });
    };

    _this.isSelected = function (name) {
      return _this.props.selected.indexOf(name) > -1;
    };

    _this.handleAddFacet = function (value) {
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          facet = _this$props.facet;


      _this.setState({
        filterText: ''
      });

      /**
       * Allows only single selection
       * @param  {[type]} facet.allowSingleSelection
       * @return {[type]}
       */
      dispatch((0, _Search.replaceFacet)(facet, value));
      dispatch((0, _Search.executeSearch)());
    };

    _this.handleRemoveFacet = function (value) {
      var _this$props2 = _this.props,
          dispatch = _this$props2.dispatch,
          facet = _this$props2.facet;

      value = value.split('/').slice(0, -1);
      var path = value.join('/');
      if (value.length === parseInt(facet.rootLevel)) {
        dispatch((0, _Search.removeFacetItem)(facet));
      } else {
        dispatch((0, _Search.replaceFacet)(facet, path));
      }
      dispatch((0, _Search.executeSearch)());
    };

    _this.state = {
      filterText: '',
      showMore: false
    };
    return _this;
  }

  HierarchicalFilter.prototype.render = function render() {
    var _props = this.props,
        facet = _props.facet,
        isCollapsed = _props.isCollapsed,
        toggleDisplay = _props.toggleDisplay;
    var values = facet.values,
        displayName = facet.displayName,
        allowSingleSelection = facet.allowSingleSelection,
        _facet$rootLevel = facet.rootLevel,
        rootLevel = _facet$rootLevel === undefined ? 0 : _facet$rootLevel,
        _facet$rollUp = facet.rollUp,
        rollUp = _facet$rollUp === undefined ? false : _facet$rollUp,
        _facet$parentNode = facet.parentNode,
        parentNode = _facet$parentNode === undefined ? null : _facet$parentNode;


    if (typeof rollUp === 'string') rollUp = rollUp !== 'false';

    var klass = (0, _classnames2['default'])({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed,
      'ola-facet-single-select': allowSingleSelection,
      'ola-facet-not-rollup': !rollUp
    });

    var originalSize = values.length;

    /* Dont show anything when no items */
    if (!originalSize) return null;

    /* Get Hierarchical values */
    values = (0, _utilities.toNestedArray)(values, rootLevel, parentNode);
    /* Selected */
    var selected = this.props.selected.map(function (item) {
      return item.split('/');
    }).reduce(function (o, i) {
      return i;
    }, []);
    var selectedPath = [];
    for (var i = 0, len = selected.length; i < len; i++) {
      selectedPath.push(selected[i - 1] ? selectedPath[i - 1] + '/' + selected[i] : selected[i]);
    }

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
          _react2['default'].createElement(CheckboxGroup, {
            values: values,
            handleAddFacet: this.handleAddFacet,
            handleRemoveFacet: this.handleRemoveFacet,
            selected: selectedPath,
            rollUp: rollUp
          })
        )
      )
    );
  };

  return HierarchicalFilter;
}(_react2['default'].Component);

/**
 * Group
 */


function CheckboxGroup(props) {
  var values = props.values,
      rollUp = props.rollUp,
      selected = props.selected,
      handleAddFacet = props.handleAddFacet,
      handleRemoveFacet = props.handleRemoveFacet;

  if (!values) return null;
  var isAnyChecked = values.some(function (value) {
    return selected.indexOf(value.name) !== -1;
  });

  return _react2['default'].createElement(
    'div',
    { className: 'ola-facet-h-group' },
    values.map(function (value, idx) {
      var index = selected.indexOf(value.name);
      var isActive = index !== -1;

      if (isActive || !rollUp || !isAnyChecked) {
        return _react2['default'].createElement(
          'div',
          { className: 'ola-facet-h-group-inner', key: idx },
          _react2['default'].createElement(CheckBoxItem, {
            value: value,
            handleAddFacet: handleAddFacet,
            handleRemoveFacet: handleRemoveFacet,
            isActive: isActive
          }),
          value.children && isActive ? _react2['default'].createElement(CheckboxGroup, {
            values: value.children,
            handleAddFacet: handleAddFacet,
            handleRemoveFacet: handleRemoveFacet,
            selected: selected,
            rollUp: rollUp
          }) : null
        );
      }
      return null;
    })
  );
}

/**
 * Item
 */
function CheckBoxItem(_ref) {
  var value = _ref.value,
      handleAddFacet = _ref.handleAddFacet,
      handleRemoveFacet = _ref.handleRemoveFacet,
      isActive = _ref.isActive;

  function onChecked(event) {
    var name = value.name;

    if (event.target.checked) {
      handleAddFacet(name);
    } else {
      handleRemoveFacet(name);
    }
  }
  var count = value.count,
      displayName = value.displayName;

  var labelKlass = (0, _classnames2['default'])({
    'ola-checkbox ola-checkbox-label': true,
    'ola-checkbox-active': isActive
  });
  return _react2['default'].createElement(
    'label',
    { className: labelKlass },
    _react2['default'].createElement('input', {
      type: 'checkbox',
      checked: isActive,
      onChange: onChecked,
      style: {
        opacity: 0,
        position: 'absolute'
      }
    }),
    _react2['default'].createElement(
      'span',
      { className: 'ola-search-facet-name', title: displayName },
      displayName
    ),
    _react2['default'].createElement(
      'span',
      { className: 'ola-search-facet-count' },
      count
    )
  );
}

module.exports = (0, _withTranslate2['default'])((0, _withToggle2['default'])(HierarchicalFilter));
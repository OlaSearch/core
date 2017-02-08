'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaFacetToggle);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var _xss = require('xss');

var _xss2 = require('../../../.babelhelper.js').interopRequireDefault(_xss);

var HierarchicalFilter = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(HierarchicalFilter, _React$Component);

  function HierarchicalFilter(props) {
    require('../../../.babelhelper.js').classCallCheck(this, HierarchicalFilter);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (HierarchicalFilter.__proto__ || Object.getPrototypeOf(HierarchicalFilter)).call(this, props));

    _this.onChangeFilterText = function (event) {
      _this.setState({
        filterText: (0, _xss2['default'])(event.target.value)
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

  require('../../../.babelhelper.js').createClass(HierarchicalFilter, [{
    key: 'render',
    value: function render() {
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
    }
  }]);

  return HierarchicalFilter;
}(_react2['default'].Component);

/**
 * Group
 */


var CheckboxGroup = function CheckboxGroup(props) {
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
};

/**
 * Item
 */

var CheckBoxItem = function (_React$Component2) {
  require('../../../.babelhelper.js').inherits(CheckBoxItem, _React$Component2);

  function CheckBoxItem() {
    var _ref;

    var _temp, _this2, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, CheckBoxItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_ref = CheckBoxItem.__proto__ || Object.getPrototypeOf(CheckBoxItem)).call.apply(_ref, [this].concat(args))), _this2), _this2.onChecked = function (event) {
      var _this2$props = _this2.props,
          name = _this2$props.value.name,
          handleAddFacet = _this2$props.handleAddFacet,
          handleRemoveFacet = _this2$props.handleRemoveFacet;

      if (event.target.checked) {
        handleAddFacet(name);
      } else {
        handleRemoveFacet(name);
      }
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this2, _ret);
  }

  require('../../../.babelhelper.js').createClass(CheckBoxItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          _props2$value = _props2.value,
          count = _props2$value.count,
          displayName = _props2$value.displayName,
          isActive = _props2.isActive;

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
          onChange: this.onChecked,
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
  }]);

  return CheckBoxItem;
}(_react2['default'].Component);

module.exports = (0, _OlaTranslate2['default'])((0, _OlaFacetToggle2['default'])(HierarchicalFilter));
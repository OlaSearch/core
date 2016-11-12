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

var _reactList = require('react-list');

var _reactList2 = require('../../../.babelhelper.js').interopRequireDefault(_reactList);

var _utilities = require('./../../utilities');

var _FilterInput = require('./common/FilterInput');

var _FilterInput2 = require('../../../.babelhelper.js').interopRequireDefault(_FilterInput);

var _xss = require('xss');

var _xss2 = require('../../../.babelhelper.js').interopRequireDefault(_xss);

var HierarchicalFilter = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(HierarchicalFilter, _React$Component);

  function HierarchicalFilter(props) {
    require('../../../.babelhelper.js').classCallCheck(this, HierarchicalFilter);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(HierarchicalFilter).call(this, props));

    _this.onChangeFilterText = function (event) {
      _this.setState({
        filterText: (0, _xss2['default'])(event.target.value)
      });
    };

    _this.isSelected = function (name) {
      return _this.props.selected.indexOf(name) > -1;
    };

    _this.handleAddFacet = function (value) {
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var facet = _this$props.facet;


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
      var _this$props2 = _this.props;
      var dispatch = _this$props2.dispatch;
      var facet = _this$props2.facet;

      value = value.split('/').slice(0, -1);
      var path = value.join('/');
      if (value.length === facet.rootLevel) {
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
      var _props = this.props;
      var facet = _props.facet;
      var isCollapsed = _props.isCollapsed;
      var toggleDisplay = _props.toggleDisplay;
      var limit = _props.limit;
      var listType = _props.listType;
      var translate = _props.translate;
      var values = facet.values;
      var displayName = facet.displayName;
      var allowSingleSelection = facet.allowSingleSelection;
      var allowedNames = facet.allowedNames;
      var _facet$rootLevel = facet.rootLevel;
      var rootLevel = _facet$rootLevel === undefined ? 0 : _facet$rootLevel;
      var _facet$rollUp = facet.rollUp;
      var rollUp = _facet$rollUp === undefined ? false : _facet$rollUp;
      var _facet$parentNode = facet.parentNode;
      var parentNode = _facet$parentNode === undefined ? null : _facet$parentNode;


      if (typeof rollUp === 'string') rollUp = rollUp === 'false' ? false : true;

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
      for (var i = 0; i < selected.length; i++) {
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


var CheckboxGroup = function (_React$Component2) {
  require('../../../.babelhelper.js').inherits(CheckboxGroup, _React$Component2);

  function CheckboxGroup() {
    require('../../../.babelhelper.js').classCallCheck(this, CheckboxGroup);

    return require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxGroup).apply(this, arguments));
  }

  require('../../../.babelhelper.js').createClass(CheckboxGroup, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props;
      var values = _props2.values;
      var rollUp = _props2.rollUp;
      var selected = _props2.selected;
      var rootLevel = _props2.rootLevel;

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

          if (isActive || !rollUp || !isAnyChecked) return _react2['default'].createElement(
            'div',
            { className: 'ola-facet-h-group-inner', key: idx },
            _react2['default'].createElement(CheckBoxItem, {
              value: value,
              handleAddFacet: _this3.props.handleAddFacet,
              handleRemoveFacet: _this3.props.handleRemoveFacet,
              isActive: isActive
            }),
            value.children && isActive ? _react2['default'].createElement(CheckboxGroup, {
              values: value.children,
              handleAddFacet: _this3.props.handleAddFacet,
              handleRemoveFacet: _this3.props.handleRemoveFacet,
              selected: selected,
              rollUp: rollUp
            }) : null
          );
          return null;
        })
      );
    }
  }]);

  return CheckboxGroup;
}(_react2['default'].Component);

/**
 * Item
 */

var CheckBoxItem = function (_React$Component3) {
  require('../../../.babelhelper.js').inherits(CheckBoxItem, _React$Component3);

  function CheckBoxItem() {
    var _Object$getPrototypeO;

    var _temp, _this4, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, CheckBoxItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this4 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CheckBoxItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this4), _this4.onChecked = function (event) {
      var _this4$props = _this4.props;
      var name = _this4$props.value.name;
      var handleAddFacet = _this4$props.handleAddFacet;
      var handleRemoveFacet = _this4$props.handleRemoveFacet;

      if (event.target.checked) {
        handleAddFacet(name);
      } else {
        handleRemoveFacet(name);
      }
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this4, _ret);
  }

  require('../../../.babelhelper.js').createClass(CheckBoxItem, [{
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var _props3$value = _props3.value;
      var count = _props3$value.count;
      var displayName = _props3$value.displayName;
      var isActive = _props3.isActive;

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
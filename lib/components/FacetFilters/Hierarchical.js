'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = _interopRequireDefault(_OlaFacetToggle);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var _xssFilters = require('xss-filters');

var _xssFilters2 = _interopRequireDefault(_xssFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var HierarchicalFilter = function (_React$Component) {
  _inherits(HierarchicalFilter, _React$Component);

  function HierarchicalFilter(props) {
    _classCallCheck(this, HierarchicalFilter);

    var _this = _possibleConstructorReturn(this, (HierarchicalFilter.__proto__ || Object.getPrototypeOf(HierarchicalFilter)).call(this, props));

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

  _createClass(HierarchicalFilter, [{
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
  _inherits(CheckBoxItem, _React$Component2);

  function CheckBoxItem() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, CheckBoxItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = CheckBoxItem.__proto__ || Object.getPrototypeOf(CheckBoxItem)).call.apply(_ref, [this].concat(args))), _this2), _this2.onChecked = function (event) {
      var _this2$props = _this2.props,
          name = _this2$props.value.name,
          handleAddFacet = _this2$props.handleAddFacet,
          handleRemoveFacet = _this2$props.handleRemoveFacet;

      if (event.target.checked) {
        handleAddFacet(name);
      } else {
        handleRemoveFacet(name);
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(CheckBoxItem, [{
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
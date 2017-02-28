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

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _utilities = require('./../../utilities');

var _FilterInput = require('./common/FilterInput');

var _FilterInput2 = _interopRequireDefault(_FilterInput);

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxFilter = function (_React$Component) {
  _inherits(CheckboxFilter, _React$Component);

  function CheckboxFilter(props) {
    _classCallCheck(this, CheckboxFilter);

    var _this = _possibleConstructorReturn(this, (CheckboxFilter.__proto__ || Object.getPrototypeOf(CheckboxFilter)).call(this, props));

    _this.handleAddFacet = function (value) {
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          facet = _this$props.facet;
      /**
       * Allows only single selection
       * @param  {[type]} facet.allowSingleSelection
       * @return {[type]}
       */

      if (facet.allowSingleSelection) {
        dispatch((0, _Search.replaceFacet)(facet, value));
      } else {
        dispatch((0, _Search.addFacet)(facet, value));
      }
      dispatch((0, _Search.executeSearch)());
    };

    _this.handleRemoveFacet = function (value) {
      var _this$props2 = _this.props,
          dispatch = _this$props2.dispatch,
          facet = _this$props2.facet;

      dispatch((0, _Search.removeFacet)(facet, value));
      dispatch((0, _Search.executeSearch)());
    };

    _this.onChangeFilterText = function (event) {
      _this.setState({
        filterText: (0, _xss2['default'])(event.target.value)
      });
    };

    _this.isSelected = function (name) {
      return _this.props.selected.indexOf(name) > -1;
    };

    _this.itemRenderer = function (values, index, key) {
      var facetNames = _this.props.facet.facetNames;
      var _values$index = values[index],
          name = _values$index.name,
          count = _values$index.count;

      var displayName = (0, _utilities.getDisplayName)(facetNames, name);
      var isActive = _this.isSelected(name);

      return _react2['default'].createElement(CheckBoxItem, {
        key: index,
        name: name,
        displayName: displayName,
        count: count,
        handleAddFacet: _this.handleAddFacet,
        handleRemoveFacet: _this.handleRemoveFacet,
        isActive: isActive
      });
    };

    _this.state = {
      filterText: '',
      showMore: false
    };
    return _this;
  }

  _createClass(CheckboxFilter, [{
    key: 'render',
    value: function render() {
      var filterText = this.state.filterText;
      var _props = this.props,
          facet = _props.facet,
          isCollapsed = _props.isCollapsed,
          toggleDisplay = _props.toggleDisplay,
          limit = _props.limit,
          listType = _props.listType,
          translate = _props.translate,
          showIfEmpty = _props.showIfEmpty;
      var values = facet.values,
          displayName = facet.displayName,
          allowSingleSelection = facet.allowSingleSelection,
          allowedNames = facet.allowedNames;

      /* Remove values with no name or name doesnt match allowedNames */

      values = values.filter(function (value) {
        return value.name && (allowedNames ? allowedNames.indexOf(value.name) !== -1 : true);
      });

      var originalSize = values.length;

      /* Dont show anything when no items */
      if (!originalSize && !showIfEmpty) return null;

      /* Filter values */

      values = values.filter(function (item) {
        return item.name.toString().match(new RegExp(filterText, 'i'));
      });

      var size = values.length;
      var klass = (0, _classnames2['default'])({
        'ola-facet': true,
        'ola-facet-collapsed': isCollapsed,
        'ola-facet-single-select': allowSingleSelection
      });
      var filterInput = originalSize > limit ? _react2['default'].createElement(_FilterInput2['default'], {
        value: filterText,
        onChange: this.onChangeFilterText,
        placeholder: translate('facet_filter_placeholder')
      }) : null;
      var itemRendererBound = this.itemRenderer.bind(this, values);

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
          filterInput,
          _react2['default'].createElement(
            'div',
            { className: 'ola-facet-list' },
            _react2['default'].createElement(
              'div',
              { className: 'ola-facet-scroll-list' },
              _react2['default'].createElement(_reactList2['default'], {
                itemRenderer: itemRendererBound,
                length: size,
                type: listType
              })
            )
          )
        )
      );
    }
  }]);

  return CheckboxFilter;
}(_react2['default'].Component);

/**
 * Checkbox Item
 * JSX No Bind
 */


CheckboxFilter.defaultProps = {
  limit: 6,
  listType: 'uniform'
};

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
          name = _this2$props.name,
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
          isActive = _props2.isActive,
          count = _props2.count,
          displayName = _props2.displayName;

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
          onChange: this.onChecked
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

module.exports = (0, _OlaTranslate2['default'])((0, _OlaFacetToggle2['default'])(CheckboxFilter));
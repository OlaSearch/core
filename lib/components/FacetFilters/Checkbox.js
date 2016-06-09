'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxFilter = function (_React$Component) {
  _inherits(CheckboxFilter, _React$Component);

  function CheckboxFilter(props) {
    _classCallCheck(this, CheckboxFilter);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxFilter).call(this, props));

    _this.handleAddFacet = function (facet, value) {
      var dispatch = _this.props.dispatch;


      _this.setState({
        filterText: ''
      });

      dispatch((0, _Search.addFacet)(facet, value));

      dispatch((0, _Search.executeSearch)());
    };

    _this.handleRemoveFacet = function (facet, value) {
      var dispatch = _this.props.dispatch;

      dispatch((0, _Search.removeFacet)(facet, value));
      dispatch((0, _Search.executeSearch)());
    };

    _this.onChangeFilterText = function (event) {
      _this.setState({
        filterText: event.target.value
      });
    };

    _this.isSelected = function (name) {
      return _this.props.selected.indexOf(name) > -1;
    };

    _this.itemRenderer = function (values, index, key) {
      var facet = _this.props.facet;
      var _values$index = values[index];
      var name = _values$index.name;
      var count = _values$index.count;

      var isActive = _this.isSelected(name);

      return _react2['default'].createElement(CheckBoxItem, {
        key: index,
        facet: facet,
        name: name,
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
      var _props = this.props;
      var facet = _props.facet;
      var isCollapsed = _props.isCollapsed;
      var toggleDisplay = _props.toggleDisplay;
      var limit = _props.limit;
      var listType = _props.listType;
      var values = facet.values;
      var displayName = facet.displayName;


      var originalSize = values.length;

      /* Filter values */

      values = values.filter(function (item) {
        return item.name.toString().match(new RegExp(filterText, 'i'));
      });

      var size = values.length;

      var klass = (0, _classnames2['default'])({
        'ola-facet': true,
        'ola-facet-collapsed': isCollapsed
      });

      var filterInput = originalSize > limit ? _react2['default'].createElement('input', {
        type: 'text',
        className: 'ola-text-input ola-facet-filter-input',
        value: filterText,
        placeholder: 'Filter',
        'arial-label': 'Input',
        onChange: this.onChangeFilterText
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
    var _Object$getPrototypeO;

    var _temp, _this2, _ret;

    _classCallCheck(this, CheckBoxItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CheckBoxItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this2), _this2.onChecked = function (event) {
      var _this2$props = _this2.props;
      var facet = _this2$props.facet;
      var name = _this2$props.name;
      var handleAddFacet = _this2$props.handleAddFacet;
      var handleRemoveFacet = _this2$props.handleRemoveFacet;

      if (event.target.checked) {
        handleAddFacet(facet, name);
      } else {
        handleRemoveFacet(facet, name);
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(CheckBoxItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var isActive = _props2.isActive;
      var facet = _props2.facet;
      var count = _props2.count;
      var name = _props2.name;
      var facetNames = facet.facetNames;

      var labelKlass = (0, _classnames2['default'])({
        'ola-checkbox ola-checkbox-label': true,
        'ola-checkbox-active': isActive
      });
      var displayName = (0, _utilities.getDisplayName)(facetNames, name);
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

module.exports = (0, _OlaFacetToggle.facetToggle)(CheckboxFilter);
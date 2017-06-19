'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Default = require('./FacetFilters/Default');

var _Default2 = _interopRequireDefault(_Default);

var _Checkbox = require('./FacetFilters/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Hierarchical = require('./FacetFilters/Hierarchical');

var _Hierarchical2 = _interopRequireDefault(_Hierarchical);

var _Range = require('./FacetFilters/Range');

var _Range2 = _interopRequireDefault(_Range);

var _Rating = require('./FacetFilters/Rating');

var _Rating2 = _interopRequireDefault(_Rating);

var _Boolean = require('./FacetFilters/Boolean');

var _Boolean2 = _interopRequireDefault(_Boolean);

var _DatePicker = require('./FacetFilters/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _TagCloud = require('./FacetFilters/TagCloud');

var _TagCloud2 = _interopRequireDefault(_TagCloud);

var _flatten = require('ramda/src/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _equals = require('ramda/src/equals');

var _equals2 = _interopRequireDefault(_equals);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchFilters = function (_React$Component) {
  _inherits(SearchFilters, _React$Component);

  function SearchFilters() {
    _classCallCheck(this, SearchFilters);

    return _possibleConstructorReturn(this, (SearchFilters.__proto__ || Object.getPrototypeOf(SearchFilters)).apply(this, arguments));
  }

  _createClass(SearchFilters, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.facets !== nextProps.facets || !(0, _equals2['default'])(this.props.selected, nextProps.selected);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          facets = _props.facets,
          selected = _props.selected,
          conditional = _props.conditional,
          className = _props.className,
          props = _objectWithoutProperties(_props, ['facets', 'selected', 'conditional', 'className']);

      /* Remove tabs */


      facets = facets.filter(function (_ref) {
        var type = _ref.type;
        return type !== 'tab';
      }

      /* Check for facets to display conditional */
      );if (conditional) {
        /* Agree with `facetsToDisplay` */
        facets = (0, _utilities.getFacetsToDisplay)(selected, facets, this.context.config.facetsToDisplay);
      }
      if (!facets.length) return null;

      var parentClass = (0, _classnames2['default'])('ola-search-filters', className);

      return _react2['default'].createElement(
        'div',
        { className: parentClass },
        _react2['default'].createElement(
          'div',
          { className: 'ola-search-filters-inner' },
          facets.map(function (facet, index) {
            /* Recalculate Selected values */

            var selectedFacets = selected.filter(function (item) {
              return item.name === facet.name;
            }).map(function (item) {
              return item.selected;
            });
            var selectedItems = (0, _flatten2['default'])(selectedFacets);
            var type = facet.type,
                name = facet.name;

            var passProps = _extends({
              facet: facet,
              selected: selectedItems,
              key: name
            }, props);

            switch (type) {
              case 'checkbox':
                return _react2['default'].createElement(_Checkbox2['default'], passProps);

              case 'hierarchical':
                return _react2['default'].createElement(_Hierarchical2['default'], passProps);

              case 'range':
              case 'daterange':
                return _react2['default'].createElement(_Range2['default'], passProps);

              case 'datepicker':
                return _react2['default'].createElement(_DatePicker2['default'], passProps);

              case 'rating':
                return _react2['default'].createElement(_Rating2['default'], passProps);

              case 'boolean':
                return _react2['default'].createElement(_Boolean2['default'], passProps);

              case 'tagcloud':
                return _react2['default'].createElement(_TagCloud2['default'], passProps);

              default:
                return _react2['default'].createElement(_Default2['default'], passProps);
            }
          })
        )
      );
    }
  }]);

  return SearchFilters;
}(_react2['default'].Component);

SearchFilters.contextTypes = {
  config: _propTypes2['default'].object
};
SearchFilters.defaultProps = {
  conditional: true
};


module.exports = SearchFilters;
'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var SearchFilters = function (_React$Component) {
  (0, _inherits3['default'])(SearchFilters, _React$Component);

  function SearchFilters() {
    (0, _classCallCheck3['default'])(this, SearchFilters);
    return (0, _possibleConstructorReturn3['default'])(this, (SearchFilters.__proto__ || (0, _getPrototypeOf2['default'])(SearchFilters)).apply(this, arguments));
  }

  (0, _createClass3['default'])(SearchFilters, [{
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
          props = (0, _objectWithoutProperties3['default'])(_props, ['facets', 'selected', 'conditional', 'className']);

      /* Remove tabs */

      facets = facets.filter(function (_ref) {
        var type = _ref.type;
        return type !== 'tab';
      });

      /* Check for facets to display conditional */
      if (conditional) {
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

            var passProps = (0, _extends3['default'])({
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
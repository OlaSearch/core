'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _Default = require('./FacetFilters/Default');

var _Default2 = require('../../.babelhelper.js').interopRequireDefault(_Default);

var _Checkbox = require('./FacetFilters/Checkbox');

var _Checkbox2 = require('../../.babelhelper.js').interopRequireDefault(_Checkbox);

var _Range = require('./FacetFilters/Range');

var _Range2 = require('../../.babelhelper.js').interopRequireDefault(_Range);

var _RangeNumeric = require('./FacetFilters/RangeNumeric');

var _RangeNumeric2 = require('../../.babelhelper.js').interopRequireDefault(_RangeNumeric);

var _Rating = require('./FacetFilters/Rating');

var _Rating2 = require('../../.babelhelper.js').interopRequireDefault(_Rating);

var _Boolean = require('./FacetFilters/Boolean');

var _Boolean2 = require('../../.babelhelper.js').interopRequireDefault(_Boolean);

var _DateRangePicker = require('./FacetFilters/DateRangePicker');

var _DateRangePicker2 = require('../../.babelhelper.js').interopRequireDefault(_DateRangePicker);

var _TagCloud = require('./FacetFilters/TagCloud');

var _TagCloud2 = require('../../.babelhelper.js').interopRequireDefault(_TagCloud);

var _flatten = require('ramda/src/flatten');

var _flatten2 = require('../../.babelhelper.js').interopRequireDefault(_flatten);

var _classnames = require('classnames');

var _classnames2 = require('../../.babelhelper.js').interopRequireDefault(_classnames);

var _utilities = require('./../utilities');

var SearchFilters = function (_React$Component) {
  require('../../.babelhelper.js').inherits(SearchFilters, _React$Component);

  function SearchFilters() {
    require('../../.babelhelper.js').classCallCheck(this, SearchFilters);

    return require('../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(SearchFilters).apply(this, arguments));
  }

  require('../../.babelhelper.js').createClass(SearchFilters, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.facets !== nextProps.facets || this.props.selected !== nextProps.selected;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var facets = _props.facets;
      var selected = _props.selected;
      var conditional = _props.conditional;
      var className = _props.className;

      var props = require('../../.babelhelper.js').objectWithoutProperties(_props, ['facets', 'selected', 'conditional', 'className']);

      /* Check for facets to display conditional */


      if (conditional) {
        /* Agree with `facetsToDisplay` */
        facets = (0, _utilities.getFacetsToDisplay)(selected, facets, this.context.config.facetsToDisplay);
      } else {
        /* Remove tabs */
        facets = facets.filter(function (facet) {
          return !facet.tab;
        });
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
            var passProps = require('../../.babelhelper.js')['extends']({
              facet: facet,
              selected: selectedItems,
              key: index
            }, props);
            var type = facet.type;
            var rangeType = facet.rangeType;


            switch (type) {
              case 'checkbox':
                return _react2['default'].createElement(_Checkbox2['default'], passProps);

              case 'range':
              case 'daterange':
                if (rangeType === 'numeric') return _react2['default'].createElement(_RangeNumeric2['default'], passProps);
                if (rangeType === 'daterangepicker') return _react2['default'].createElement(_DateRangePicker2['default'], passProps);
                return _react2['default'].createElement(_Range2['default'], passProps);

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
  config: _react2['default'].PropTypes.object
};
SearchFilters.defaultProps = {
  conditional: true
};


module.exports = SearchFilters;
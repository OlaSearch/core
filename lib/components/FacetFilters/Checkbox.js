'use strict';

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

var _xssFilters = require('xss-filters');

var _xssFilters2 = _interopRequireDefault(_xssFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CheckboxFilter = function (_React$Component) {
  (0, _inherits3['default'])(CheckboxFilter, _React$Component);

  function CheckboxFilter(props) {
    (0, _classCallCheck3['default'])(this, CheckboxFilter);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (CheckboxFilter.__proto__ || (0, _getPrototypeOf2['default'])(CheckboxFilter)).call(this, props));

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

    _this.toggleshowMore = function () {
      _this.setState({
        showMore: !_this.state.showMore
      });
    };

    _this.onChangeFilterText = function (event) {
      _this.setState({
        filterText: _xssFilters2['default'].inHTMLData(event.target.value)
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

  (0, _createClass3['default'])(CheckboxFilter, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          filterText = _state.filterText,
          showMore = _state.showMore;
      var _props = this.props,
          facet = _props.facet,
          toggleDisplay = _props.toggleDisplay,
          listType = _props.listType,
          translate = _props.translate,
          showIfEmpty = _props.showIfEmpty,
          isCollapsed = _props.isCollapsed;
      var values = facet.values,
          displayName = facet.displayName,
          allowSingleSelection = facet.allowSingleSelection,
          _facet$exclusions = facet.exclusions,
          exclusions = _facet$exclusions === undefined ? [] : _facet$exclusions,
          _facet$limit = facet.limit,
          limit = _facet$limit === undefined ? 6 : _facet$limit,
          fixedValues = facet.fixedValues;

      /* Remove values with no name or name doesnt match allowedNames */

      values = values.filter(function (value) {
        return value.name;
      });

      /* Remove values in exclusion list */
      values = values.filter(function (_ref) {
        var name = _ref.name;
        return exclusions.indexOf(name) === -1;
      });

      var originalSize = values.length;

      /* Dont show anything when no items */
      if (!originalSize && !showIfEmpty) return null;

      /* User specified values */
      if (fixedValues) values = fixedValues.map(function (item) {
        return { name: item };
      });

      /* Filter values */
      values = values.filter(function (item) {
        return item.name.toString().match(new RegExp(filterText, 'i'));
      });

      var size = values.length;

      /* Should display show more link */
      var shouldDisplayShowMore = size > limit;

      /* Show more */
      if (!showMore) values = values.slice(0, limit);

      var showMoreLink = shouldDisplayShowMore ? _react2['default'].createElement(
        'button',
        { className: 'ola-btn ola-link-show-more ' + (showMore ? 'ola-link-show-less' : ''), onClick: this.toggleshowMore },
        showMore ? translate('facet_filter_showless') : translate('facet_filter_showmore')
      ) : null;

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
                length: values.length,
                type: listType
              })
            ),
            showMoreLink
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
  listType: 'uniform'
};
var CheckBoxItem = function CheckBoxItem(props) {
  function onChecked(event) {
    var name = props.name,
        handleAddFacet = props.handleAddFacet,
        handleRemoveFacet = props.handleRemoveFacet;

    if (event.target.checked) {
      handleAddFacet(name);
    } else {
      handleRemoveFacet(name);
    }
  }

  var isActive = props.isActive,
      count = props.count,
      displayName = props.displayName;

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
      onChange: onChecked
    }),
    _react2['default'].createElement(
      'span',
      { className: 'ola-search-facet-name', title: displayName },
      displayName
    ),
    count && _react2['default'].createElement(
      'span',
      { className: 'ola-search-facet-count' },
      count
    )
  );
};

module.exports = (0, _OlaTranslate2['default'])((0, _OlaFacetToggle2['default'])(CheckboxFilter));
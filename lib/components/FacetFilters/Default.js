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

var _Tag = require('./../Misc/Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = _interopRequireDefault(_OlaFacetToggle);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var _FilterInput = require('./common/FilterInput');

var _FilterInput2 = _interopRequireDefault(_FilterInput);

var _xssFilters = require('xss-filters');

var _xssFilters2 = _interopRequireDefault(_xssFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LinkFilter = function (_React$Component) {
  (0, _inherits3['default'])(LinkFilter, _React$Component);

  function LinkFilter(props) {
    (0, _classCallCheck3['default'])(this, LinkFilter);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (LinkFilter.__proto__ || (0, _getPrototypeOf2['default'])(LinkFilter)).call(this, props));

    _this.handleAddFacet = function (value) {
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          facet = _this$props.facet;


      _this.setState({
        filterText: ''
      });

      dispatch((0, _Search.addFacet)(facet, value));
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
      var _values$index = values[index],
          name = _values$index.name,
          count = _values$index.count;
      var facetNames = _this.props.facet.facetNames;

      var isSelected = _this.isSelected(name);
      var displayName = (0, _utilities.getDisplayName)(facetNames, name);
      return _react2['default'].createElement(Item, {
        key: key,
        isSelected: isSelected,
        name: name,
        count: count,
        displayName: displayName,
        onItemClick: _this.handleAddFacet
      });
    };

    _this.state = {
      filterText: '',
      showMore: false
    };
    return _this;
  }

  (0, _createClass3['default'])(LinkFilter, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          filterText = _state.filterText,
          showMore = _state.showMore;
      var _props = this.props,
          facet = _props.facet,
          limit = _props.limit,
          selected = _props.selected,
          isCollapsed = _props.isCollapsed,
          toggleDisplay = _props.toggleDisplay,
          listType = _props.listType,
          translate = _props.translate,
          showIfEmpty = _props.showIfEmpty,
          showSelectedFacetItem = _props.showSelectedFacetItem,
          debug = _props.debug;
      var values = facet.values,
          _facet$showSelectedTa = facet.showSelectedTag,
          showSelectedTag = _facet$showSelectedTa === undefined ? true : _facet$showSelectedTa,
          removeLabel = facet.removeLabel,
          _facet$exclusions = facet.exclusions,
          exclusions = _facet$exclusions === undefined ? [] : _facet$exclusions;

      /* Remove values with no name */

      values = values.filter(function (value) {
        return value.name;
      });

      /* Remove values in exclusion list */
      values = values.filter(function (_ref) {
        var name = _ref.name;
        return name.indexOf(exclusions) === -1;
      });

      if (!showSelectedFacetItem) values = values.filter(function (item) {
        return selected.indexOf(item.name) === -1;
      });

      var originalSize = values.length;

      /* Dont show anything when no items */
      if (!originalSize && !showIfEmpty) return null;

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

      var klass = (0, _classnames2['default'])('ola-facet ola-facet-default', {
        'ola-facet-collapsed': isCollapsed
      });

      var itemRendererBound = this.itemRenderer.bind(this, values);

      var filterInput = originalSize > limit ? _react2['default'].createElement(_FilterInput2['default'], {
        value: filterText,
        onChange: this.onChangeFilterText,
        placeholder: translate('facet_filter_placeholder')
      }) : null;

      return _react2['default'].createElement(
        'div',
        { className: klass },
        _react2['default'].createElement(
          'h4',
          { className: 'ola-facet-title', onClick: toggleDisplay },
          facet.displayName
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ola-facet-wrapper' },
          filterInput,
          showSelectedTag || debug ? _react2['default'].createElement(
            'div',
            { className: 'ola-facet-tags-selected' },
            selected.map(function (item, idx) {
              return _react2['default'].createElement(SelectedItem, {
                name: item,
                facet: facet,
                handleRemove: _this2.handleRemoveFacet,
                key: idx,
                buttonLabel: removeLabel
              });
            })
          ) : null,
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
  return LinkFilter;
}(_react2['default'].Component);

/**
 * Facet item component
 */

LinkFilter.defaultProps = {
  limit: 5,
  listType: 'uniform',
  showIfEmpty: false,
  showSelectedFacetItem: false,
  debug: false
};

var Item = function (_React$Component2) {
  (0, _inherits3['default'])(Item, _React$Component2);

  function Item() {
    var _ref2;

    var _temp, _this3, _ret;

    (0, _classCallCheck3['default'])(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = (0, _possibleConstructorReturn3['default'])(this, (_ref2 = Item.__proto__ || (0, _getPrototypeOf2['default'])(Item)).call.apply(_ref2, [this].concat(args))), _this3), _this3.handleClick = function () {
      _this3.props.onItemClick(_this3.props.name);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this3, _ret);
  }

  (0, _createClass3['default'])(Item, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          count = _props2.count,
          displayName = _props2.displayName,
          isSelected = _props2.isSelected;

      var itemKlass = (0, _classnames2['default'])('ola-btn', 'ola-facet-link', { 'ola-facet-link-active': isSelected });

      return _react2['default'].createElement(
        'div',
        { className: 'ola-btn-wrap' },
        _react2['default'].createElement(
          'button',
          {
            className: itemKlass,
            type: 'button',
            onClick: this.handleClick,
            title: displayName
          },
          _react2['default'].createElement(
            'span',
            { className: 'ola-search-facet-name' },
            displayName
          )
        ),
        _react2['default'].createElement(
          'span',
          { className: 'ola-search-facet-count' },
          count
        )
      );
    }
  }]);
  return Item;
}(_react2['default'].Component);

/**
 * Selected Tag
 */

var SelectedItem = function (_React$Component3) {
  (0, _inherits3['default'])(SelectedItem, _React$Component3);

  function SelectedItem() {
    var _ref3;

    var _temp2, _this4, _ret2;

    (0, _classCallCheck3['default'])(this, SelectedItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this4 = (0, _possibleConstructorReturn3['default'])(this, (_ref3 = SelectedItem.__proto__ || (0, _getPrototypeOf2['default'])(SelectedItem)).call.apply(_ref3, [this].concat(args))), _this4), _this4.handleRemove = function () {
      _this4.props.handleRemove(_this4.props.name);
    }, _temp2), (0, _possibleConstructorReturn3['default'])(_this4, _ret2);
  }

  (0, _createClass3['default'])(SelectedItem, [{
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          name = _props3.name,
          facet = _props3.facet,
          buttonLabel = _props3.buttonLabel;

      return _react2['default'].createElement(_Tag2['default'], {
        onRemove: this.handleRemove,
        name: name,
        facet: facet,
        buttonLabel: buttonLabel
      });
    }
  }]);
  return SelectedItem;
}(_react2['default'].Component);

module.exports = (0, _OlaTranslate2['default'])((0, _OlaFacetToggle2['default'])(LinkFilter));
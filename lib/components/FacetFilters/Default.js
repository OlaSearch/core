'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _Tag = require('./../Misc/Tag');

var _Tag2 = require('../../../.babelhelper.js').interopRequireDefault(_Tag);

var _reactList = require('react-list');

var _reactList2 = require('../../../.babelhelper.js').interopRequireDefault(_reactList);

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaFacetToggle);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var _FilterInput = require('./common/FilterInput');

var _FilterInput2 = require('../../../.babelhelper.js').interopRequireDefault(_FilterInput);

var _xss = require('xss');

var _xss2 = require('../../../.babelhelper.js').interopRequireDefault(_xss);

var LinkFilter = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(LinkFilter, _React$Component);

  function LinkFilter(props) {
    require('../../../.babelhelper.js').classCallCheck(this, LinkFilter);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (LinkFilter.__proto__ || Object.getPrototypeOf(LinkFilter)).call(this, props));

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
        filterText: (0, _xss2['default'])(event.target.value)
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

  require('../../../.babelhelper.js').createClass(LinkFilter, [{
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
          removeLabel = facet.removeLabel;

      /* Remove values with no name */

      values = values.filter(function (value) {
        return value.name;
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
  require('../../../.babelhelper.js').inherits(Item, _React$Component2);

  function Item() {
    var _ref;

    var _temp, _this3, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this3), _this3.handleClick = function () {
      _this3.props.onItemClick(_this3.props.name);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this3, _ret);
  }

  require('../../../.babelhelper.js').createClass(Item, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          count = _props2.count,
          displayName = _props2.displayName,
          isSelected = _props2.isSelected;

      var itemKlass = (0, _classnames2['default'])('ola-btn', 'ola-facet-link', { 'ola-facet-link-active': isSelected });

      return _react2['default'].createElement(
        'button',
        {
          className: itemKlass,
          type: 'button',
          onClick: this.handleClick
        },
        _react2['default'].createElement(
          'span',
          { className: 'ola-search-facet-name' },
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

  return Item;
}(_react2['default'].Component);

/**
 * Selected Tag
 */

var SelectedItem = function (_React$Component3) {
  require('../../../.babelhelper.js').inherits(SelectedItem, _React$Component3);

  function SelectedItem() {
    var _ref2;

    var _temp2, _this4, _ret2;

    require('../../../.babelhelper.js').classCallCheck(this, SelectedItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this4 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_ref2 = SelectedItem.__proto__ || Object.getPrototypeOf(SelectedItem)).call.apply(_ref2, [this].concat(args))), _this4), _this4.handleRemove = function () {
      _this4.props.handleRemove(_this4.props.name);
    }, _temp2), require('../../../.babelhelper.js').possibleConstructorReturn(_this4, _ret2);
  }

  require('../../../.babelhelper.js').createClass(SelectedItem, [{
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
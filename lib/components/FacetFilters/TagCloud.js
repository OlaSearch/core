'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = _interopRequireDefault(_OlaFacetToggle);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TagCloud = function TagCloud(props) {
  function handleAddFacet(value) {
    var dispatch = props.dispatch,
        facet = props.facet;

    dispatch((0, _Search.addFacet)(facet, value));
    dispatch((0, _Search.executeSearch)());
  }

  var facet = props.facet,
      selected = props.selected,
      isCollapsed = props.isCollapsed,
      toggleDisplay = props.toggleDisplay,
      fontSizeMin = props.fontSizeMin,
      fontSizeMax = props.fontSizeMax,
      showSelectedFacetItem = props.showSelectedFacetItem;
  var values = facet.values;

  var counts = values.map(function (value) {
    return value.count;
  });
  var max = Math.max.apply(undefined, counts);
  var min = Math.min.apply(undefined, counts);

  var klass = (0, _classnames2['default'])({
    'ola-facet': true,
    'ola-facet-collapsed': isCollapsed
  });

  if (!showSelectedFacetItem) values = values.filter(function (item) {
    return selected.indexOf(item.name) === -1;
  });

  if (!values.length) return null;
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
      values.map(function (value, idx) {
        return _react2['default'].createElement(TagCloudItem, {
          key: idx,
          value: value,
          min: min,
          max: max,
          fontSizeMax: fontSizeMax,
          fontSizeMin: fontSizeMin,
          onSelect: handleAddFacet
        });
      })
    )
  );
};

TagCloud.defaultProps = {
  fontSizeMin: 16,
  fontSizeMax: 24,
  showSelectedFacetItem: false

  /**
   * Tag cloud item
   */
};var TagCloudItem = function TagCloudItem(_ref) {
  var onSelect = _ref.onSelect,
      value = _ref.value,
      min = _ref.min,
      max = _ref.max,
      fontSizeMin = _ref.fontSizeMin,
      fontSizeMax = _ref.fontSizeMax;

  function handleClick() {
    onSelect(value.name);
  }
  var name = value.name,
      count = value.count;

  var size = count === min ? fontSizeMin : count / max * (fontSizeMax - fontSizeMin) + fontSizeMin;
  return _react2['default'].createElement(
    'button',
    {
      className: 'ola-btn-tag',
      style: { fontSize: size + 'px' },
      onClick: handleClick },
    name
  );
};

module.exports = (0, _OlaFacetToggle2['default'])(TagCloud);
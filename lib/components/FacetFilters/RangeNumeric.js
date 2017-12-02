'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaToggle = require('./../../decorators/OlaToggle');

var _OlaToggle2 = _interopRequireDefault(_OlaToggle);

var _Search = require('./../../actions/Search');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function RangeNumericFilter(props) {
  function handleClick(from, to) {
    var facet = props.facet,
        dispatch = props.dispatch;


    if (typeof from === 'undefined' || typeof to === 'undefined') {
      dispatch((0, _Search.removeFacet)(facet));
    } else {
      dispatch((0, _Search.replaceFacet)(facet, [from, to]));
    }
    dispatch((0, _Search.executeSearch)());
  }
  var facet = props.facet,
      isCollapsed = props.isCollapsed,
      toggleDisplay = props.toggleDisplay;
  var displayName = facet.displayName,
      values = facet.values;


  var klass = (0, _classnames2['default'])({
    'ola-facet': true,
    'ola-facet-collapsed': isCollapsed
  });
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
        values.map(function (value, idx) {
          return _react2['default'].createElement(RangeNumericItem, {
            value: value,
            handleClick: handleClick,
            key: idx
          });
        })
      )
    )
  );
}

/**
 * Numeric item
 */
function RangeNumericItem(_ref) {
  var value = _ref.value,
      handleClick = _ref.handleClick;

  function onItemClick() {
    var from = value.from,
        to = value.to;

    handleClick(from, to);
  }

  var count = value.count,
      name = value.name;

  var itemKlass = (0, _classnames2['default'])('ola-btn', 'ola-facet-link', {
    'ola-facet-link-active': false
  });
  return _react2['default'].createElement(
    'div',
    { className: itemKlass, onClick: onItemClick },
    _react2['default'].createElement(
      'span',
      { className: 'ola-search-facet-count' },
      count
    ),
    _react2['default'].createElement(
      'span',
      { className: 'ola-search-facet-name' },
      name
    )
  );
}

module.exports = (0, _OlaToggle2['default'])(RangeNumericFilter);
'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../actions/Search');

var _OlaTranslate = require('./../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var ClearAllFacets = function ClearAllFacets(_ref) {
  var selected = _ref.selected,
      dispatch = _ref.dispatch,
      translate = _ref.translate;

  function handleClick() {
    dispatch((0, _Search.removeAllFacets)());
    dispatch((0, _Search.executeSearch)());
  }
  if (!selected.length) return null;
  return _react2['default'].createElement(
    'button',
    {
      type: 'button',
      className: 'ola-link-clear-all-filters',
      onClick: handleClick
    },
    translate('clear_all_filters')
  );
};

module.exports = (0, _OlaTranslate2['default'])(ClearAllFacets);
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../actions/Search');

var _withTranslate = require('./../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function ClearAllFacets(_ref) {
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
}

module.exports = (0, _withTranslate2['default'])(ClearAllFacets);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _minusSquare = require('@olasearch/icons/lib/minus-square');

var _minusSquare2 = _interopRequireDefault(_minusSquare);

var _plusSquare = require('@olasearch/icons/lib/plus-square');

var _plusSquare2 = _interopRequireDefault(_plusSquare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(_plusSquare2['default'], null);

var _ref3 = _react2['default'].createElement(_minusSquare2['default'], null);

function FacetTitle(_ref) {
  var toggleDisplay = _ref.toggleDisplay,
      displayName = _ref.displayName,
      isCollapsed = _ref.isCollapsed;

  return _react2['default'].createElement(
    'h4',
    { className: 'ola-facet-title', onClick: toggleDisplay },
    displayName,
    isCollapsed ? _ref2 : _ref3
  );
}

exports['default'] = FacetTitle;
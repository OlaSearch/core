'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Breadcrumbs = function Breadcrumbs(_ref) {
  var crumbs = _ref.crumbs;

  if (!crumbs) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-crumbs' },
    crumbs.map(function (crumb, idx) {
      return _react2['default'].createElement(
        'span',
        { key: idx },
        crumb
      );
    })
  );
};

module.exports = Breadcrumbs;
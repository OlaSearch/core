'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Displays a section breadcrumb in snippet
 * @example ./../../../examples/Fields.Breadcrumbs.md
 */
function Breadcrumbs(_ref) {
  var crumbs = _ref.crumbs;

  if (!crumbs) return null;

  if (typeof crumbs === 'string') {
    return _react2['default'].createElement(
      'div',
      { className: 'ola-field ola-field-crumbs ola-field-crumbs-tag' },
      crumbs
    );
  }
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
}

module.exports = Breadcrumbs;
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Ui = require('./../actions/Ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FilterButton = function FilterButton(_ref) {
  var toggleSidebar = _ref.toggleSidebar,
      facets = _ref.facets;

  var hasFilter = facets.some(function (item) {
    return item.values.length > 0;
  });
  if (!hasFilter) return null;
  return _react2['default'].createElement(
    'button',
    {
      className: 'ola-link-open-filter',
      onClick: toggleSidebar,
      type: 'button'
    },
    'Filter'
  );
};

module.exports = (0, _reactRedux.connect)(null, { toggleSidebar: _Ui.toggleSidebar })(FilterButton);
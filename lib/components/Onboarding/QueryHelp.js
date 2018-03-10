'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _x = require('@olasearch/icons/lib/x');

var _x2 = _interopRequireDefault(_x);

var _utilities = require('./../../utilities');

var _Ui = require('./../../actions/Ui');

var _withConfig = require('./../../decorators/withConfig');

var _withConfig2 = _interopRequireDefault(_withConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(_x2['default'], { size: 20 });

function QueryHelp(_ref) {
  var isVisible = _ref.isVisible,
      isNewUser = _ref.isNewUser,
      showSearchHelp = _ref.showSearchHelp,
      hideSearchHelp = _ref.hideSearchHelp,
      config = _ref.config;
  var searchHelpText = config.searchHelpText;

  if (!isVisible || !showSearchHelp || !searchHelpText) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-query-help' },
    _react2['default'].createElement(
      'button',
      { className: 'ola-btn ola-btn-close', onMouseDown: hideSearchHelp },
      _ref2
    ),
    _react2['default'].createElement(
      'div',
      { className: 'ola-query-help-content' },
      _react2['default'].createElement('div', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(searchHelpText) })
    )
  );
}
function mapStateToProps(state) {
  return {
    isNewUser: state.Context.isNewUser,
    showSearchHelp: state.AppState.showSearchHelp
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { hideSearchHelp: _Ui.hideSearchHelp })((0, _withConfig2['default'])(QueryHelp));
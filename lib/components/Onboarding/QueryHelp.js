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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref3 = _react2['default'].createElement(_x2['default'], { size: 20 });

function QueryHelp(_ref, _ref2) {
  var isVisible = _ref.isVisible,
      isNewUser = _ref.isNewUser,
      showSearchHelp = _ref.showSearchHelp,
      hideSearchHelp = _ref.hideSearchHelp;
  var searchHelpText = _ref2.config.searchHelpText;

  if (!isVisible || !showSearchHelp) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-query-help' },
    _react2['default'].createElement(
      'button',
      { className: 'ola-btn ola-btn-close', onMouseDown: hideSearchHelp },
      _ref3
    ),
    _react2['default'].createElement(
      'div',
      { className: 'ola-query-help-content' },
      _react2['default'].createElement('div', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(searchHelpText) })
    )
  );
}

QueryHelp.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};

function mapStateToProps(state) {
  return {
    isNewUser: state.Context.isNewUser,
    showSearchHelp: state.AppState.showSearchHelp
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { hideSearchHelp: _Ui.hideSearchHelp })(QueryHelp);
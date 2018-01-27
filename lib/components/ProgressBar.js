'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLineProgress = require('react-line-progress');

var _reactLineProgress2 = _interopRequireDefault(_reactLineProgress);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function ProgressBar(_ref) {
  var isLoading = _ref.isLoading,
      isLoadingAnswer = _ref.isLoadingAnswer;

  return _react2['default'].createElement(_reactLineProgress2['default'], {
    percent: isLoading || isLoadingAnswer ? 40 : 100,
    autoIncrement: true,
    spinner: false
  });
}

function mapStateToProps(state) {
  return {
    isLoading: state.AppState.isLoading,
    isLoadingAnswer: state.AppState.isLoadingAnswer
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)(ProgressBar);
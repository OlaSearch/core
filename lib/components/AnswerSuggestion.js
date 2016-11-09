'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _ref = _react2['default'].createElement('div', null);

var AnswerSuggestion = function (_React$Component) {
  require('../../.babelhelper.js').inherits(AnswerSuggestion, _React$Component);

  function AnswerSuggestion() {
    require('../../.babelhelper.js').classCallCheck(this, AnswerSuggestion);

    return require('../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(AnswerSuggestion).apply(this, arguments));
  }

  require('../../.babelhelper.js').createClass(AnswerSuggestion, [{
    key: 'render',
    value: function render() {
      return _ref;
    }
  }]);

  return AnswerSuggestion;
}(_react2['default'].Component);

function mapStateToProps(state) {
  return {
    answer: state.AppState.answer
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)(AnswerSuggestion);
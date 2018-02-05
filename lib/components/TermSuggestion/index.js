'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _reactRedux = require('react-redux');

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function TermSuggestion(_ref) {
  var term = _ref.term,
      answer = _ref.answer,
      totalResults = _ref.totalResults,
      translate = _ref.translate,
      className = _ref.className,
      q = _ref.q,
      updateQueryTerm = _ref.updateQueryTerm,
      skipSpellcheck = _ref.skipSpellcheck,
      executeSearch = _ref.executeSearch;

  if (!term) return null;
  if (answer && (answer.data || answer.callback || answer.suggestions && answer.suggestions.length) || totalResults === 0) {
    return null;
  }
  return _react2['default'].createElement(
    'div',
    (0, _extends3['default'])({ className: 'ola-term-suggestion' }, className),
    _react2['default'].createElement(
      'span',
      { className: 'ola-term-suggestion-showing' },
      translate('suggestions_showing_results_for', { term: term, q: q }, true)
    )
  );
}

function mapStateToProps(state) {
  return {
    term: state.AppState.suggestedTerm,
    q: state.QueryState.q,
    totalResults: state.AppState.totalResults,
    answer: state.AppState.answer,
    isLoading: state.AppState.isLoading
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, {
  updateQueryTerm: _Search.updateQueryTerm,
  skipSpellcheck: _Search.skipSpellcheck,
  executeSearch: _Search.executeSearch
})((0, _withTranslate2['default'])(TermSuggestion));
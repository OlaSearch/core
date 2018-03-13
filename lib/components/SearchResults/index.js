'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require('@olasearch/styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Default = require('./../Snippets/Default');

var _Default2 = _interopRequireDefault(_Default);

var _Answer = require('./../Snippets/Answer');

var _Answer2 = _interopRequireDefault(_Answer);

var _utilities = require('./../../utilities');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withTheme = require('./../../decorators/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _withConfig = require('./../../decorators/withConfig');

var _withConfig2 = _interopRequireDefault(_withConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SearchResults = function (_React$Component) {
  (0, _inherits3['default'])(SearchResults, _React$Component);

  function SearchResults() {
    (0, _classCallCheck3['default'])(this, SearchResults);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  SearchResults.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    if (nextProps.alwaysUpdate) return true;
    return this.props.results !== nextProps.results || this.props.bookmarks !== nextProps.bookmarks;
  };

  SearchResults.prototype.render = function render() {
    var _props = this.props,
        results = _props.results,
        className = _props.className,
        snippetOverride = _props.snippet,
        theme = _props.theme,
        config = _props.config,
        rest = (0, _objectWithoutProperties3['default'])(_props, ['results', 'className', 'snippet', 'theme', 'config']);
    var snippetRules = config.snippetRules,
        defaultSnippet = config.defaultSnippet;

    var classes = (0, _classnames2['default'])('ola-results', className);
    return _react2['default'].createElement(
      'div',
      {
        className: _style2['default'].dynamic([['990041512', [theme.searchLinkColor, theme.searchLinkHoverColor, theme.primaryButtonColor, theme.primaryButtonBackground, theme.shareButtonColor, theme.shareButtonBackground, theme.primaryColor, theme.primaryColor, theme.primaryColor]]]) + ' ' + (classes || '')
      },
      results.map(function (result, idx) {
        var isAnswer = result.ola_answer;

        var OlaSnippet = isAnswer ? _Answer2['default'] : snippetOverride || (0, _utilities.getMatchingSnippet)(snippetRules, result) || defaultSnippet || _Default2['default'];
        var key = result.id || idx;
        return _react2['default'].createElement(OlaSnippet, (0, _extends3['default'])({ result: result, key: key, theme: theme }, rest));
      }),
      _react2['default'].createElement(_style2['default'], {
        styleId: '990041512',
        css: '.ola-results.__jsx-style-dynamic-selector .ola-field-title a{color:' + theme.searchLinkColor + ';}.ola-results.__jsx-style-dynamic-selector .ola-field-title a:hover,.ola-field-title a:focus{color:' + theme.searchLinkHoverColor + ';}.ola-results.__jsx-style-dynamic-selector .ola-cta-button{color:' + theme.primaryButtonColor + ';background:' + theme.primaryButtonBackground + ';}.ola-results.__jsx-style-dynamic-selector .ola-btn-share{color:' + theme.shareButtonColor + ';background:' + theme.shareButtonBackground + ';}.ola-results.__jsx-style-dynamic-selector .ola-drop-link{color:' + theme.primaryColor + ';background:white;}.ola-results.__jsx-style-dynamic-selector .ola-drop-link:hover{background:#eee;}.ola-results.__jsx-style-dynamic-selector .ola-btn-directions{color:' + theme.primaryColor + ';}.ola-results.__jsx-style-dynamic-selector .ola-btn-person{color:' + theme.primaryColor + ';}',
        dynamic: [theme.searchLinkColor, theme.searchLinkHoverColor, theme.primaryButtonColor, theme.primaryButtonBackground, theme.shareButtonColor, theme.shareButtonBackground, theme.primaryColor, theme.primaryColor, theme.primaryColor]
      })
    );
  };

  return SearchResults;
}(_react2['default'].Component);

SearchResults.defaultProps = {
  alwaysUpdate: false,
  results: [],
  bookmarks: []
};


module.exports = (0, _withConfig2['default'])((0, _withTheme2['default'])(SearchResults));
'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SearchResults = function (_React$Component) {
  (0, _inherits3['default'])(SearchResults, _React$Component);

  function SearchResults() {
    (0, _classCallCheck3['default'])(this, SearchResults);
    return (0, _possibleConstructorReturn3['default'])(this, (SearchResults.__proto__ || (0, _getPrototypeOf2['default'])(SearchResults)).apply(this, arguments));
  }

  (0, _createClass3['default'])(SearchResults, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.alwaysUpdate) return true;
      return this.props.results !== nextProps.results || this.props.bookmarks !== nextProps.bookmarks;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          results = _props.results,
          className = _props.className,
          snippetOverride = _props.snippet,
          rest = (0, _objectWithoutProperties3['default'])(_props, ['results', 'className', 'snippet']);
      var _context$config = this.context.config,
          snippetRules = _context$config.snippetRules,
          defaultSnippet = _context$config.defaultSnippet;

      var klass = (0, _classnames2['default'])('ola-results', className);
      return _react2['default'].createElement(
        'div',
        { className: klass },
        results.map(function (result, idx) {
          var isAnswer = result.ola_answer;

          var OlaSnippet = isAnswer ? _Answer2['default'] : snippetOverride || (0, _utilities.getMatchingSnippet)(snippetRules, result) || defaultSnippet || _Default2['default'];
          var key = result.id || idx;
          return _react2['default'].createElement(OlaSnippet, (0, _extends3['default'])({
            result: result,
            key: key
          }, rest));
        })
      );
    }
  }]);
  return SearchResults;
}(_react2['default'].Component);

SearchResults.defaultProps = {
  alwaysUpdate: false,
  results: [],
  bookmarks: []
};
SearchResults.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};


module.exports = SearchResults;
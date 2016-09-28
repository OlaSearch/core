'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Default = require('./../Snippets/Default');

var _Default2 = require('../../../.babelhelper.js').interopRequireDefault(_Default);

var _Answer = require('./../Snippets/Answer');

var _Answer2 = require('../../../.babelhelper.js').interopRequireDefault(_Answer);

var _utilities = require('./../../utilities');

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var SearchResults = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(SearchResults, _React$Component);

  function SearchResults() {
    require('../../../.babelhelper.js').classCallCheck(this, SearchResults);

    return require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(SearchResults).apply(this, arguments));
  }

  require('../../../.babelhelper.js').createClass(SearchResults, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.alwaysUpdate) return true;
      return this.props.results !== nextProps.results || this.props.bookmarks !== nextProps.bookmarks;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var results = _props.results;
      var className = _props.className;
      var snippetOverride = _props.snippet;

      var rest = require('../../../.babelhelper.js').objectWithoutProperties(_props, ['results', 'className', 'snippet']);

      var _context$config = this.context.config;
      var snippetRules = _context$config.snippetRules;
      var defaultSnippet = _context$config.defaultSnippet;

      var klass = (0, _classnames2['default'])('ola-results', className);
      return _react2['default'].createElement(
        'div',
        { className: klass },
        results.map(function (result, idx) {
          var ola_answer = result.ola_answer;

          var OlaSnippet = ola_answer ? _Answer2['default'] : snippetOverride || (0, _utilities.getMatchingSnippet)(snippetRules, result) || defaultSnippet || _Default2['default'];
          var key = result.id || idx;
          return _react2['default'].createElement(OlaSnippet, require('../../../.babelhelper.js')['extends']({
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
  alwaysUpdate: false
};
SearchResults.contextTypes = {
  config: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, _react2['default'].PropTypes.func])
};


module.exports = SearchResults;
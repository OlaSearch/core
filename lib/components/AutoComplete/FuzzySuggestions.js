'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var _Settings = require('./../../constants/Settings');

var Suggestions = function Suggestions(_ref) {
  var q = _ref.q,
      results = _ref.results,
      rest = require('../../../.babelhelper.js').objectWithoutProperties(_ref, ['q', 'results']);

  return _react2['default'].createElement(
    'div',
    { className: 'ola-fuzzy-suggestions' },
    results.map(function (result, idx) {
      return _react2['default'].createElement(SuggestionItem, require('../../../.babelhelper.js')['extends']({ key: idx, q: q, result: result }, rest));
    })
  );
};

/**
 * Suggestion item
 */

var SuggestionItem = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(SuggestionItem, _React$Component);

  function SuggestionItem(props) {
    require('../../../.babelhelper.js').classCallCheck(this, SuggestionItem);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (SuggestionItem.__proto__ || Object.getPrototypeOf(SuggestionItem)).call(this, props));

    _this.onMouseOver = function () {
      _this.setState({
        isActive: true
      });
    };

    _this.onMouseOut = function () {
      _this.setState({
        isActive: false
      });
    };

    _this.onSelect = function (event) {
      _this.props.onSelect(_this.props.result);
      event && event.preventDefault();
    };

    _this.state = {
      isActive: false
    };
    return _this;
  }

  require('../../../.babelhelper.js').createClass(SuggestionItem, [{
    key: 'render',
    value: function render() {
      var activeClass = this.state.isActive ? this.props.activeClassName : null;
      var _props$result = this.props.result,
          type = _props$result.type,
          term = _props$result.term,
          taxoTerm = _props$result.taxo_term,
          isLastCategory = _props$result.isLastCategory,
          isFirstCategory = _props$result.isFirstCategory,
          history = _props$result.history;

      var pattern = '(^' + this.props.q.replace(_Settings.RE_ESCAPE, '\\$1').split(/\s/).join('|') + ')';

      /* Create term */
      term = term.replace(new RegExp(pattern, 'gi'), '<strong>$1</strong>');

      var klass = (0, _classnames2['default'])('ola-suggestion-item', activeClass, 'ola-suggestion-type-' + type, {
        'ola-suggestion-category-last': isLastCategory,
        'ola-suggestion-category-first': isFirstCategory,
        'ola-suggestion-category-name': taxoTerm,
        'ola-suggestion-history': history
      });
      /**
       * If its a category
       */
      if (taxoTerm && type !== 'taxonomy') {
        term = term + (taxoTerm ? '<span class="ola-suggestion-separator"> in </span><span class="ola-suggestion-category-name">' + taxoTerm + '</span>' : '');
      }

      return _react2['default'].createElement('button', {
        className: klass,
        onClick: this.onSelect,
        onMouseOver: this.onMouseOver,
        onMouseOut: this.onMouseOut,
        dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(term)
      });
    }
  }]);

  return SuggestionItem;
}(_react2['default'].Component);

module.exports = Suggestions;
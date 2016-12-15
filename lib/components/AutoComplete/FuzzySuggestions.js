'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var _Settings = require('./../../constants/Settings');

var Suggestions = function Suggestions(_ref) {
  var q = _ref.q;
  var results = _ref.results;

  var rest = require('../../../.babelhelper.js').objectWithoutProperties(_ref, ['q', 'results']);

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

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(SuggestionItem).call(this, props));

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
      var _props$result = this.props.result;
      var type = _props$result.type;
      var term = _props$result.term;
      var taxoTerm = _props$result.taxo_term;
      var isLastCategory = _props$result.isLastCategory;
      var isFirstCategory = _props$result.isFirstCategory;
      var history = _props$result.history;

      var pattern = '(^' + this.props.q.replace(_Settings.RE_ESCAPE, '\\$1') + ')';

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
        term = term + (taxoTerm ? ' in <span class="ola-suggestion-category-name">' + taxoTerm + '</span>' : '');
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
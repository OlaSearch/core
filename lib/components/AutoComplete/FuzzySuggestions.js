'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

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

var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');

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
      event.preventDefault();
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
      var term = _props$result.term;
      var payload = _props$result.payload;
      var categoryName = _props$result.category_name;
      var isLastCategory = _props$result.isLastCategory;
      var isFirstCategory = _props$result.isFirstCategory;

      var pattern = '(' + this.props.q.replace(reEscape, '\\$1') + ')';
      term = term.replace(new RegExp(pattern, 'gi'), '<strong>$1</strong>') + (categoryName ? ' in <span class="ola-suggestion-category-name">' + categoryName + '</span>' : '');
      var klass = (0, _classnames2['default'])('ola-suggestion-item', activeClass, {
        'ola-suggestion-category-last': isLastCategory,
        'ola-suggestion-category-first': isFirstCategory,
        'ola-suggestion-category-name': payload.taxo_group
      });
      return _react2['default'].createElement('a', {
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
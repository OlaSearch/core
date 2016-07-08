'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var Suggestions = function Suggestions(_ref) {
  var results = _ref.results;

  var rest = require('../../../.babelhelper.js').objectWithoutProperties(_ref, ['results']);

  return _react2['default'].createElement(
    'div',
    { className: 'ola-fuzzy-suggestions' },
    results.map(function (result, idx) {
      return _react2['default'].createElement(SuggestionItem, require('../../../.babelhelper.js')['extends']({ key: idx }, result, rest));
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

    _this.onSelect = function () {
      _this.props.onSelect(_this.props.term);
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
      var klass = (0, _classnames2['default'])('ola-suggestion-item', activeClass);
      return _react2['default'].createElement(
        'a',
        {
          className: klass,
          onClick: this.onSelect,
          onMouseOver: this.onMouseOver,
          onMouseOut: this.onMouseOut
        },
        this.props.term
      );
    }
  }]);

  return SuggestionItem;
}(_react2['default'].Component);

module.exports = Suggestions;
'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _Settings = require('./../../constants/Settings');

var SpellSuggestion = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(SpellSuggestion, _React$Component);

  function SpellSuggestion() {
    var _ref;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, SpellSuggestion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_ref = SpellSuggestion.__proto__ || Object.getPrototypeOf(SpellSuggestion)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (term) {
      var dispatch = _this.props.dispatch;


      dispatch((0, _Search.updateQueryTerm)(term, _Settings.SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION));
      dispatch((0, _Search.executeSearch)());
    }, _this.handleClick = function (term) {
      _this.props.onChange ? _this.props.onChange(term, _Settings.SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION) : _this.onChange(term);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(SpellSuggestion, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.suggestions !== this.props.suggestions;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          suggestions = _props.suggestions,
          showCount = _props.showCount,
          translate = _props.translate;


      if (!suggestions.length) return null;

      return _react2['default'].createElement(
        'div',
        { className: 'ola-spell-suggestion' },
        _react2['default'].createElement(
          'span',
          null,
          translate('suggestions_did_you_mean')
        ),
        suggestions.map(function (item, idx) {
          return _react2['default'].createElement(TermItem, {
            handleClick: _this2.handleClick,
            showCount: showCount,
            item: item,
            key: idx
          });
        })
      );
    }
  }]);

  return SpellSuggestion;
}(_react2['default'].Component);

/**
 * Spell suggestion term
 */


SpellSuggestion.defaultProps = {
  showCount: false,
  alwaysVisible: false
};
var TermItem = function TermItem(_ref2) {
  var item = _ref2.item,
      showCount = _ref2.showCount,
      handleClick = _ref2.handleClick;

  function onClick() {
    handleClick(item.term);
  }

  var term = item.term,
      count = item.count;

  return _react2['default'].createElement(
    'button',
    {
      type: 'button',
      className: 'ola-spell-links',
      onClick: onClick
    },
    _react2['default'].createElement(
      'span',
      { className: 'ola-spell-term' },
      term
    ),
    showCount && _react2['default'].createElement(
      'span',
      { className: 'ola-spell-count' },
      count
    )
  );
};

module.exports = (0, _OlaTranslate2['default'])(SpellSuggestion);
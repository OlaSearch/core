'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_olaTranslate);

var SpellSuggestion = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(SpellSuggestion, _React$Component);

  function SpellSuggestion() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, SpellSuggestion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SpellSuggestion)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onChange = function (term) {
      var dispatch = _this.props.dispatch;


      dispatch((0, _Search.updateQueryTerm)(term));

      dispatch((0, _Search.executeSearch)());
    }, _this.handleClick = function (term) {
      _this.props.onChange ? _this.props.onChange(term) : _this.onChange(term);
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

      var _props = this.props;
      var suggestions = _props.suggestions;
      var showCount = _props.showCount;
      var translate = _props.translate;


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

var TermItem = function (_React$Component2) {
  require('../../../.babelhelper.js').inherits(TermItem, _React$Component2);

  function TermItem() {
    var _Object$getPrototypeO2;

    var _temp2, _this3, _ret2;

    require('../../../.babelhelper.js').classCallCheck(this, TermItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(TermItem)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.handleClick = function () {
      _this3.props.handleClick(_this3.props.item.term);
    }, _temp2), require('../../../.babelhelper.js').possibleConstructorReturn(_this3, _ret2);
  }

  require('../../../.babelhelper.js').createClass(TermItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var item = _props2.item;
      var showCount = _props2.showCount;
      var term = item.term;
      var count = item.count;

      return _react2['default'].createElement(
        'button',
        {
          type: 'button',
          className: 'ola-spell-links',
          onClick: this.handleClick
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
    }
  }]);

  return TermItem;
}(_react2['default'].Component);

module.exports = (0, _olaTranslate2['default'])(SpellSuggestion);
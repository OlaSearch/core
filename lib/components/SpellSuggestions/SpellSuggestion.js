'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = _interopRequireDefault(_olaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var SpellSuggestion = function (_React$Component) {
  _inherits(SpellSuggestion, _React$Component);

  function SpellSuggestion() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, SpellSuggestion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SpellSuggestion)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onChange = function (term) {
      var dispatch = _this.props.dispatch;


      dispatch((0, _Search.updateQueryTerm)(term));

      dispatch((0, _Search.executeSearch)());
    }, _this.handleClick = function (term) {
      _this.props.onChange ? _this.props.onChange(term) : _this.onChange(term);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SpellSuggestion, [{
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
      var totalResults = _props.totalResults;
      var showCount = _props.showCount;
      var alwaysVisible = _props.alwaysVisible;
      var translate = _props.translate;


      if (!suggestions.length) return null;

      var max = suggestions.reduce(function (a, b) {
        return a.count > b.count ? a : b;
      });

      /* Check if Current results is less than the suggestions */

      if (totalResults >= max.count && !alwaysVisible) return null;

      return _react2['default'].createElement(
        'div',
        { className: 'ola-spell-suggestion' },
        _react2['default'].createElement(
          'span',
          null,
          translate('suggestions.did_you_mean')
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
  _inherits(TermItem, _React$Component2);

  function TermItem() {
    var _Object$getPrototypeO2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, TermItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(TermItem)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.handleClick = function () {
      _this3.props.handleClick(_this3.props.item.term);
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(TermItem, [{
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
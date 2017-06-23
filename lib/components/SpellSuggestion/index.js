'use strict';

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

var _Search = require('./../../actions/Search');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _Settings = require('./../../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SpellSuggestion = function (_React$Component) {
  (0, _inherits3['default'])(SpellSuggestion, _React$Component);

  function SpellSuggestion() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, SpellSuggestion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = SpellSuggestion.__proto__ || (0, _getPrototypeOf2['default'])(SpellSuggestion)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (term) {
      var dispatch = _this.props.dispatch;


      dispatch((0, _Search.updateQueryTerm)(term, _Settings.SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION));
      dispatch((0, _Search.executeSearch)());
    }, _this.handleClick = function (term) {
      _this.props.onChange ? _this.props.onChange(term, _Settings.SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION) : _this.onChange(term);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(SpellSuggestion, [{
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
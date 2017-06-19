'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var _Settings = require('./../../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Suggestions = function Suggestions(_ref) {
  var q = _ref.q,
      results = _ref.results,
      rest = _objectWithoutProperties(_ref, ['q', 'results']);

  return _react2['default'].createElement(
    'div',
    { className: 'ola-fuzzy-suggestions' },
    results.map(function (result, idx) {
      return _react2['default'].createElement(SuggestionItem, _extends({ key: idx, q: q, result: result }, rest));
    })
  );
};

/**
 * Suggestion item
 */

var SuggestionItem = function (_React$Component) {
  _inherits(SuggestionItem, _React$Component);

  function SuggestionItem(props) {
    _classCallCheck(this, SuggestionItem);

    var _this = _possibleConstructorReturn(this, (SuggestionItem.__proto__ || Object.getPrototypeOf(SuggestionItem)).call(this, props));

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

  _createClass(SuggestionItem, [{
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
      }
      /**
       * If its a category
       */
      );if (taxoTerm && type !== 'taxonomy') {
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports['default'] = Suggestions;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

var _Settings = require('./../../constants/Settings');

var _AnswerQuick = require('./../Answer/AnswerQuick');

var _AnswerQuick2 = _interopRequireDefault(_AnswerQuick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Suggestions(_ref) {
  var q = _ref.q,
      results = _ref.results,
      rest = (0, _objectWithoutProperties3['default'])(_ref, ['q', 'results']);

  return _react2['default'].createElement(
    'div',
    { className: 'ola-fuzzy-suggestions' },
    results.map(function (result, idx) {
      return _react2['default'].createElement(SuggestionItem, (0, _extends3['default'])({ key: idx, index: idx, q: q, result: result }, rest));
    })
  );
}

/**
 * Suggestion item
 */

var SuggestionItem = function (_React$Component) {
  (0, _inherits3['default'])(SuggestionItem, _React$Component);

  function SuggestionItem(props) {
    (0, _classCallCheck3['default'])(this, SuggestionItem);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (SuggestionItem.__proto__ || (0, _getPrototypeOf2['default'])(SuggestionItem)).call(this, props));

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

    _this.onSelect = function (event, result) {
      _this.props.onSelect(result || _this.props.result, {
        position: _this.props.index + 1
      });
      event && event.preventDefault();
    };

    _this.removeHistory = function (event) {
      _this.props.onRemoveHistory(_this.props.result);
      event.stopPropagation();
    };

    _this.state = {
      isActive: false
    };
    return _this;
  }

  (0, _createClass3['default'])(SuggestionItem, [{
    key: 'render',
    value: function render() {
      var activeClass = this.state.isActive ? this.props.activeClassName : null;
      var _props = this.props,
          index = _props.index,
          result = _props.result;

      if (!result) return null;
      var type = result.type,
          term = result.term,
          title = result.title,
          taxoTerm = result.taxo_term,
          isLastCategory = result.isLastCategory,
          isFirstCategory = result.isFirstCategory,
          answer = result.answer;

      var isHistory = type === _Settings.TYPE_HISTORY;
      var isDoc = type === _Settings.TYPE_DOC;
      var pattern = '(^' + this.props.q.replace(_Settings.RE_ESCAPE, '\\$1').split(/\s/).join('|') + ')';

      /* Create term */
      if (isDoc) {
        term = title;
      } else {
        term = term.replace(new RegExp(pattern, 'gi'), '<strong>$1</strong>');
      }

      var klass = (0, _classnames2['default'])('ola-suggestion-item', activeClass, 'ola-suggestion-type-' + type, {
        'ola-suggestion-category-last': isLastCategory,
        'ola-suggestion-category-first': isFirstCategory,
        'ola-suggestion-category-name': taxoTerm,
        'ola-suggestion-history': isHistory,
        'ola-suggestion-hasAnswer': answer && index === 0
      });
      /**
       * If its a category
       */
      if (taxoTerm && type !== _Settings.TYPE_TAXONOMY) {
        term = term + (taxoTerm ? '<span class="ola-suggestion-separator"> in </span><span class="ola-suggestion-category-name">' + taxoTerm + '</span>' : '');
      }
      return _react2['default'].createElement(
        'div',
        { className: 'ola-suggestion-wrapper' },
        _react2['default'].createElement(
          'div',
          {
            className: klass,
            onClick: this.onSelect,
            onMouseOver: this.onMouseOver,
            onMouseOut: this.onMouseOut
          },
          _react2['default'].createElement('div', {
            className: 'ola-suggestion-item-text',
            dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(term)
          }),
          index === 0 ? _react2['default'].createElement(_AnswerQuick2['default'], {
            answer: answer,
            onSelect: this.onSelect,
            index: index
          }) : null
        )
      );
    }
  }]);
  return SuggestionItem;
}(_react2['default'].Component);
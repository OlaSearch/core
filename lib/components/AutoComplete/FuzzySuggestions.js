'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

function groupFacets(suggestions, fieldLabels) {
  var group = {};
  suggestions.forEach(function (s) {
    var label = fieldLabels[s.taxo_label] || s.taxo_label;
    if (!(label in group)) {
      group[label] = [];
    }
    group[label].push(s);
  });
  return group;
}

function Suggestions(_ref) {
  var q = _ref.q,
      results = _ref.results,
      fieldLabels = _ref.fieldLabels,
      rest = (0, _objectWithoutProperties3['default'])(_ref, ['q', 'results', 'fieldLabels']);

  var isFacet = false; // results.some(({ type }) => type === 'facet')
  var groups = isFacet ? groupFacets(results, fieldLabels) : {};
  return _react2['default'].createElement(
    'div',
    { className: 'ola-fuzzy-suggestions' },
    isFacet ? (0, _keys2['default'])(groups).map(function (key) {
      return _react2['default'].createElement(
        'div',
        { key: key },
        _react2['default'].createElement(
          'div',
          { className: 'ola-suggestion-header' },
          key
        ),
        groups[key].map(function (result, idx) {
          return _react2['default'].createElement(SuggestionItem, (0, _extends3['default'])({
            key: idx,
            index: idx,
            q: q,
            result: result
          }, rest));
        })
      );
    }) : results.map(function (result, idx) {
      return _react2['default'].createElement(SuggestionItem, (0, _extends3['default'])({
        key: idx,
        index: idx,
        q: q,
        result: result
      }, rest));
    })
  );
}

Suggestions.defaultProps = {
  fieldLabels: {}

  /**
   * Suggestion item
   */
};
var SuggestionItem = function (_React$Component) {
  (0, _inherits3['default'])(SuggestionItem, _React$Component);

  function SuggestionItem(props) {
    (0, _classCallCheck3['default'])(this, SuggestionItem);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

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
        position: _this.props.index + 1,
        event: event
      });
      event && event.preventDefault();
    };

    _this.removeHistory = function (event) {
      _this.props.onRemoveHistory(_this.props.result);
      event.stopPropagation();
    };

    _this.createMarkup = function (term, tokens) {
      /* Highlight tokens if available */
      // console.log(term, tokens, highlightTokens(term, tokens))
      if (tokens) term = (0, _utilities.highlightTokens)(term, tokens);

      return (0, _utilities.createHTMLMarkup)(term);
    };

    _this.state = {
      isActive: false
    };
    return _this;
  }

  SuggestionItem.prototype.render = function render() {
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
        answer = result.answer,
        tokens = result.tokens;

    var isHistory = type === _Settings.TYPE_HISTORY;
    var isDoc = type === _Settings.TYPE_DOC;
    var pattern = '(^' + this.props.q.replace(_Settings.RE_ESCAPE, '\\$1').split(/\s/).join('|') + ')';

    /* Create term */
    if (isDoc) {
      term = title;
    } else {
      if (tokens && tokens.length || isHistory) {
        // Pass
      } else {
        term = term.replace(new RegExp(pattern, 'gi'), '<strong>$1</strong>');
      }
    }

    var klass = (0, _classnames2['default'])('ola-suggestion-item', activeClass, 'ola-suggestion-type-' + type, {
      'ola-suggestion-category-last': isLastCategory,
      'ola-suggestion-category-first': isFirstCategory,
      'ola-suggestion-category-name': taxoTerm,
      'ola-suggestion-history': isHistory,
      'ola-suggestion-hasToken': tokens && tokens.length,
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
          dangerouslySetInnerHTML: this.createMarkup(term, tokens)
        }),
        index === 0 ? _react2['default'].createElement(_AnswerQuick2['default'], {
          answer: answer,
          onSelect: this.onSelect,
          index: index
        }) : null
      )
    );
  };

  return SuggestionItem;
}(_react2['default'].Component);
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Search = require('./../../actions/Search');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _Settings = require('./../../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SpellSuggestion = function SpellSuggestion(props) {
  function onChange(term) {
    var dispatch = props.dispatch;

    dispatch((0, _Search.updateQueryTerm)(term, _Settings.SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION));
    dispatch((0, _Search.executeSearch)());
  }
  function handleClick(term) {
    props.onChange ? props.onChange(term, _Settings.SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION) : onChange(term);
  }
  var suggestions = props.suggestions,
      showCount = props.showCount,
      translate = props.translate;


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
        handleClick: handleClick,
        showCount: showCount,
        item: item,
        key: idx
      });
    })
  );
};

SpellSuggestion.defaultProps = {
  showCount: false,
  alwaysVisible: false
};

/**
 * Spell suggestion term
 */
var TermItem = function TermItem(_ref) {
  var item = _ref.item,
      showCount = _ref.showCount,
      handleClick = _ref.handleClick;

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
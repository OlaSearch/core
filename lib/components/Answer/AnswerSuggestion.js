'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _AnswerDropdown = require('./AnswerDropdown');

var _AnswerDropdown2 = require('../../../.babelhelper.js').interopRequireDefault(_AnswerDropdown);

var _equals = require('ramda/src/equals');

var _equals2 = require('../../../.babelhelper.js').interopRequireDefault(_equals);

var WILDCARD_MODULE_NAMES = ['spices.wildcard', 'spices.meeting'];

var AnswerSuggestion = function AnswerSuggestion(props) {
  var answer = props.answer;
  var onChange = props.onChange;
  var onSkipIntent = props.onSkipIntent;
  var suggestions = answer.suggestions;
  var original = answer.original;
  var module = answer.module;

  var keys = Object.keys(suggestions);
  var text = original.split('');
  var newKeys = [];

  keys.map(function (key) {
    var _suggestions$key = suggestions[key];
    var position = _suggestions$key.position;
    var selection = _suggestions$key.selection;
    var options = _suggestions$key.suggestions;

    var _position = require('../../../.babelhelper.js').slicedToArray(position, 1);

    var start = _position[0];
    /* Add to new keys */

    newKeys.push(options[selection].name.toLowerCase());
    /* Generate dropdown */
    text[start] = _react2['default'].createElement(_AnswerDropdown2['default'], { key: key, item: key, options: options, active: selection, onChange: onChange });
  });

  keys.map(function (key) {
    var _suggestions$key$posi = require('../../../.babelhelper.js').slicedToArray(suggestions[key].position, 2);

    var start = _suggestions$key$posi[0];
    var end = _suggestions$key$posi[1];

    text = text.map(function (item, idx) {
      if (idx > start && idx < end) {
        return '';
      }
      return item;
    });
  });

  /* Remove multiple empty spaces */
  text = text.filter(function (item, idx) {
    if (!item && !item[idx - 1]) {
      return false;
    }
    return true;
  });

  var shouldShowSuggestion = WILDCARD_MODULE_NAMES.indexOf(module) !== -1 && !(0, _equals2['default'])(keys, newKeys);

  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-suggestion' },
    _react2['default'].createElement(
      'span',
      null,
      'Showing results for ',
      text
    ),
    shouldShowSuggestion ? _react2['default'].createElement(
      'span',
      { className: 'ola-answer-suggestion-instead' },
      'Search for ',
      _react2['default'].createElement(
        'a',
        { onClick: onSkipIntent },
        original
      ),
      ' instead'
    ) : null
  );
};

module.exports = AnswerSuggestion;
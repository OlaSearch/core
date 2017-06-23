'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AnswerDropdown = require('./AnswerDropdown');

var _AnswerDropdown2 = _interopRequireDefault(_AnswerDropdown);

var _equals = require('ramda/src/equals');

var _equals2 = _interopRequireDefault(_equals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var WILDCARD_MODULE_NAMES = ['spices.wildcard', 'spices.meeting'];

var AnswerSuggestion = function AnswerSuggestion(_ref) {
  var answer = _ref.answer,
      onChange = _ref.onChange,
      onSkipIntent = _ref.onSkipIntent;

  if (!answer.suggestions || !(0, _keys2['default'])(answer.suggestions).length) return null;
  var suggestions = answer.suggestions,
      original = answer.original,
      module = answer.module;

  var keys = (0, _keys2['default'])(suggestions);
  var text = original.split('');
  var newKeys = [];

  keys.map(function (key) {
    var _suggestions$key = suggestions[key],
        position = _suggestions$key.position,
        selection = _suggestions$key.selection,
        options = _suggestions$key.suggestions;

    var _position = (0, _slicedToArray3['default'])(position, 1),
        start = _position[0];
    /* Add to new keys */


    newKeys.push(options[selection].name.toLowerCase());
    /* Generate dropdown */
    text[start] = _react2['default'].createElement(_AnswerDropdown2['default'], { key: key, item: key, options: options, active: selection, onChange: onChange });
  });

  keys.map(function (key) {
    var _suggestions$key$posi = (0, _slicedToArray3['default'])(suggestions[key].position, 2),
        start = _suggestions$key$posi[0],
        end = _suggestions$key$posi[1];

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
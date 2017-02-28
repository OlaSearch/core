'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

  if (!answer.suggestions || !Object.keys(answer.suggestions).length) return null;
  var suggestions = answer.suggestions,
      original = answer.original,
      module = answer.module;

  var keys = Object.keys(suggestions);
  var text = original.split('');
  var newKeys = [];

  keys.map(function (key) {
    var _suggestions$key = suggestions[key],
        position = _suggestions$key.position,
        selection = _suggestions$key.selection,
        options = _suggestions$key.suggestions;

    var _position = _slicedToArray(position, 1),
        start = _position[0];
    /* Add to new keys */


    newKeys.push(options[selection].name.toLowerCase());
    /* Generate dropdown */
    text[start] = _react2['default'].createElement(_AnswerDropdown2['default'], { key: key, item: key, options: options, active: selection, onChange: onChange });
  });

  keys.map(function (key) {
    var _suggestions$key$posi = _slicedToArray(suggestions[key].position, 2),
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
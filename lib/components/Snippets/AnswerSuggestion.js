'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _remove = require('ramda/src/remove');

var _remove2 = require('../../../.babelhelper.js').interopRequireDefault(_remove);

var _AnswerDropdown = require('./AnswerDropdown');

var _AnswerDropdown2 = require('../../../.babelhelper.js').interopRequireDefault(_AnswerDropdown);

var AnswerSuggestion = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(AnswerSuggestion, _React$Component);

  function AnswerSuggestion() {
    require('../../../.babelhelper.js').classCallCheck(this, AnswerSuggestion);

    return require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(AnswerSuggestion).apply(this, arguments));
  }

  require('../../../.babelhelper.js').createClass(AnswerSuggestion, [{
    key: 'render',
    value: function render() {
      var answer = this.props.answer;
      var suggestions = answer.suggestions;
      var original = answer.original;

      var keys = Object.keys(suggestions);
      var text = original.split('');
      var prevString = '';
      var startIndex = 0;

      keys.map(function (key) {
        var _suggestions$key = suggestions[key];
        var position = _suggestions$key.position;
        var selection = _suggestions$key.selection;
        var items = _suggestions$key.suggestions;

        var _position = require('../../../.babelhelper.js').slicedToArray(position, 2);

        var start = _position[0];
        var end = _position[1];

        text[start] = _react2['default'].createElement(_AnswerDropdown2['default'], { key: key, items: items, active: selection });
      });
      /**
       * Remove elements
       */
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
      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-suggestion' },
        'Showing results for ',
        text
      );
    }
  }]);

  return AnswerSuggestion;
}(_react2['default'].Component);

module.exports = AnswerSuggestion;
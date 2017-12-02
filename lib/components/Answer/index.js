'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AnswerSuggestion = require('./AnswerSuggestion');

var _AnswerSuggestion2 = _interopRequireDefault(_AnswerSuggestion);

var _TableDetail = require('./common/TableDetail');

var _TableDetail2 = _interopRequireDefault(_TableDetail);

var _ItemDetail = require('./common/ItemDetail');

var _ItemDetail2 = _interopRequireDefault(_ItemDetail);

var _AnswerGrid = require('./AnswerGrid');

var _AnswerGrid2 = _interopRequireDefault(_AnswerGrid);

var _AnswerGeneric = require('./AnswerGeneric');

var _AnswerGeneric2 = _interopRequireDefault(_AnswerGeneric);

var _AnswerList = require('./AnswerList');

var _AnswerList2 = _interopRequireDefault(_AnswerList);

var _AnswerPersonInfoDetail = require('./AnswerPersonInfoDetail');

var _AnswerPersonInfoDetail2 = _interopRequireDefault(_AnswerPersonInfoDetail);

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(
  'div',
  { className: 'ola-answer-loading' },
  _react2['default'].createElement(
    'p',
    null,
    'Loading instant answer'
  )
);

function Answer(_ref) {
  var result = _ref.result,
      answer = _ref.answer,
      isLoading = _ref.isLoading,
      dispatch = _ref.dispatch,
      templates = _ref.templates;

  function handleChange(option, index, itemKey) {
    dispatch((0, _Search.changeAnswerSelection)(index, itemKey, answer));
  }
  function handleSkipIntent() {
    dispatch((0, _Search.updateQueryTerm)(answer.original));
    dispatch((0, _Search.setSkipIntent)(true));
    dispatch((0, _Search.executeSearch)());
  }
  function templatePicker(template, data, module) {
    /* Check for user defined templates */
    if (templates && templates.hasOwnProperty(template)) {
      var Component = templates[template];
      return _react2['default'].createElement(Component, { data: data, module: module });
    }
    switch (template) {
      case 'table_detail':
        return _react2['default'].createElement(_TableDetail2['default'], { data: data });

      case 'person_info_grid':
      case 'text':
        return _react2['default'].createElement(_AnswerGrid2['default'], {
          data: data,
          result: result,
          answer: answer
        });

      case 'item_detail':
        return _react2['default'].createElement(_ItemDetail2['default'], { data: data });

      case 'person_info_detail':
        return _react2['default'].createElement(_AnswerPersonInfoDetail2['default'], { data: data });

      case 'list':
        return _react2['default'].createElement(_AnswerList2['default'], { data: data });

      case 'generic':
        return _react2['default'].createElement(_AnswerGeneric2['default'], data);

      default:
        return null;
    }
  }

  if (isLoading) {
    return _ref2;
  }

  if (!answer || !answer.card) return null;

  var card = answer.card,
      module = answer.module,
      intent = answer.intent;
  var template = card.template,
      source = card.source;

  var intentName = intent ? intent.split('.').pop() : null;
  var snippetClass = (0, _classnames2['default'])('ola-snippet-answer', 'ola-snippet-template-' + template);
  var answerKlass = (0, _classnames2['default'])('ola-answer', 'ola-answer-intent-' + intentName, 'ola-answer-template-' + template);
  /**
   * If the answer is from Intent engine
   */
  if (card) {
    return _react2['default'].createElement(
      'div',
      { className: snippetClass },
      _react2['default'].createElement(_AnswerSuggestion2['default'], {
        answer: answer,
        onChange: handleChange,
        onSkipIntent: handleSkipIntent
      }),
      _react2['default'].createElement(
        'div',
        { className: answerKlass },
        templatePicker(template, card, module)
      ),
      source ? _react2['default'].createElement(
        'div',
        { className: 'ola-answer-source' },
        'Source:',
        ' ',
        _react2['default'].createElement(
          'a',
          { target: '_blank', href: source.url },
          source.name
        )
      ) : null
    );
  }
  return null;
}

module.exports = Answer;
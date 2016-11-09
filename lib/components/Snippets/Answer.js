'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Thumbnail = require('./../Fields/Thumbnail');

var _Thumbnail2 = require('../../../.babelhelper.js').interopRequireDefault(_Thumbnail);

var _AnswerSuggestion = require('./AnswerSuggestion');

var _AnswerSuggestion2 = require('../../../.babelhelper.js').interopRequireDefault(_AnswerSuggestion);

var _utilities = require('./../../utilities');

var _Search = require('./../../actions/Search');

var _ref2 = _react2['default'].createElement(
  'div',
  { className: 'ola-answer-loading' },
  _react2['default'].createElement(
    'p',
    null,
    'Fetching instant answer'
  )
);

var Answer = function Answer(_ref) {
  var answer = _ref.answer;
  var isLoading = _ref.isLoading;
  var result = _ref.result;
  var enrichedQuery = _ref.enrichedQuery;
  var imageSize = _ref.imageSize;
  var dispatch = _ref.dispatch;

  if (isLoading) {
    return _ref2;
  }
  /**
   * If the answer is from search engine
   */
  if (result) {
    return _react2['default'].createElement(
      'div',
      { className: 'ola-snippet ola-answer' },
      _react2['default'].createElement('div', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(result.ola_answer) })
    );
  }
  if (!answer) return null;
  var data = answer.data;
  var callback = answer.callback;
  var template = answer.template;
  var enrich = answer.enrich;
  var source = answer.source;
  var suggestions = answer.suggestions;

  /**
   * If the answer is from Intent engine
   */

  if (data) {
    return _react2['default'].createElement(
      'div',
      { className: 'ola-snippet-answer' },
      enrichedQuery ? _react2['default'].createElement(_AnswerSuggestion2['default'], {
        answer: answer
      }) : null,
      _react2['default'].createElement(
        'div',
        { className: 'ola-snippet ola-answer' },
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-items' },
          data.map(function (_ref3, idx) {
            var image = _ref3.image;
            var description = _ref3.description;
            var subtitle = _ref3.subtitle;
            var title = _ref3.title;

            if (answer.module === 'spices.facts.place.capital') {
              image = image.length > 1 ? image[1] : image;
            }
            return _react2['default'].createElement(
              'div',
              { className: 'ola-answer-item', key: idx },
              _react2['default'].createElement(
                'div',
                { className: 'ola-answer-image' },
                _react2['default'].createElement(_Thumbnail2['default'], {
                  thumbnail: image && encodeURIComponent(image),
                  size: imageSize
                })
              ),
              _react2['default'].createElement(
                'div',
                { className: 'ola-answer-content' },
                _react2['default'].createElement(
                  'h3',
                  { className: 'ola-answer-title' },
                  _react2['default'].createElement(
                    'a',
                    { onClick: function onClick() {
                        dispatch((0, _Search.updateQueryTerm)(title));
                        dispatch((0, _Search.executeSearch)());
                      } },
                    title
                  )
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'ola-answer-subtitle' },
                  subtitle || description
                )
              )
            );
          })
        ),
        source ? _react2['default'].createElement(
          'div',
          { className: 'ola-answer-source' },
          'Source: ',
          _react2['default'].createElement(
            'a',
            { target: '_blank', href: source.url },
            source.name
          )
        ) : null
      )
    );
  }
  return null;
};

Answer.defaultProps = {
  imageSize: '400x280'
};

module.exports = Answer;
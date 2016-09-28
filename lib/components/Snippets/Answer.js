'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Thumbnail = require('./../Fields/Thumbnail');

var _Thumbnail2 = require('../../../.babelhelper.js').interopRequireDefault(_Thumbnail);

var _utilities = require('./../../utilities');

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
  /**
   * If the answer is from Intent engine
   */

  if (data) {
    return _react2['default'].createElement(
      'div',
      { className: 'ola-snippet ola-answer' },
      data.map(function (_ref3, idx) {
        var image = _ref3.image;
        var description = _ref3.description;
        var subtitle = _ref3.subtitle;
        var title = _ref3.title;

        return _react2['default'].createElement(
          'div',
          { className: 'ola-answer-item', key: idx },
          _react2['default'].createElement(
            'div',
            { className: 'ola-answer-image' },
            _react2['default'].createElement(_Thumbnail2['default'], {
              thumbnail: image,
              width: '120'
            })
          ),
          _react2['default'].createElement(
            'div',
            { className: 'ola-answer-content' },
            _react2['default'].createElement(
              'h2',
              null,
              title
            ),
            _react2['default'].createElement(
              'p',
              null,
              description
            ),
            _react2['default'].createElement(
              'p',
              null,
              _react2['default'].createElement(
                'small',
                null,
                source.name,
                ' - ',
                source.url
              )
            )
          )
        );
      })
    );
  }
  return null;
};

module.exports = Answer;
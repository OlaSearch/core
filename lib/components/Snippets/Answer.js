'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Thumbnail = require('./../Fields/Thumbnail');

var _Thumbnail2 = require('../../../.babelhelper.js').interopRequireDefault(_Thumbnail);

var Answer = function Answer(_ref) {
  var answer = _ref.answer;

  if (!answer || !Object.keys(answer).length) return null;
  var title = answer.title;
  var description = answer.description;
  var image = answer.image;
  var source = answer.source;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer' },
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
};

module.exports = Answer;
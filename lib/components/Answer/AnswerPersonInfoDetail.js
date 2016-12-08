'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _ListKeyValue = require('./common/ListKeyValue');

var _ListKeyValue2 = require('../../../.babelhelper.js').interopRequireDefault(_ListKeyValue);

var Answer = function Answer(_ref) {
  var data = _ref.data;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-answer-person-info-detail' },
    data.map(function (item) {
      var title = item.title;
      var subtitle = item.subtitle;
      var description = item.description;
      var additionalData = item.additional_data;

      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-item' },
        _react2['default'].createElement(
          'h3',
          { className: 'ola-answer-title' },
          title
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ola-answer-subtitle' },
          subtitle || description
        ),
        _react2['default'].createElement(_ListKeyValue2['default'], { data: additionalData })
      );
    })
  );
};

module.exports = Answer;
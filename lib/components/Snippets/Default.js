'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Title = require('./../Fields/Title');

var _Title2 = require('../../../.babelhelper.js').interopRequireDefault(_Title);

var _Thumbnail = require('./../Fields/Thumbnail');

var _Thumbnail2 = require('../../../.babelhelper.js').interopRequireDefault(_Thumbnail);

var _Summary = require('./../Fields/Summary');

var _Summary2 = require('../../../.babelhelper.js').interopRequireDefault(_Summary);

var DefaultSnippet = function DefaultSnippet(_ref) {
  var result = _ref.result;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet' },
    _react2['default'].createElement(
      'div',
      { className: 'ola-snippet-image' },
      _react2['default'].createElement(_Thumbnail2['default'], {
        thumbnail: result.thumbnail,
        thumbnail_mobile: result.thumbnail_mobile
      })
    ),
    _react2['default'].createElement(
      'div',
      { className: 'ola-snippet-content' },
      _react2['default'].createElement(_Title2['default'], { result: result }),
      _react2['default'].createElement(_Summary2['default'], { result: result })
    )
  );
};

module.exports = DefaultSnippet;
'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var Subtitles = function Subtitles(_ref) {
  var subtitles = _ref.subtitles,
      baseUrl = _ref.baseUrl,
      _ref$iconLeft = _ref.iconLeft,
      iconLeft = _ref$iconLeft === undefined ? null : _ref$iconLeft,
      _ref$iconRight = _ref.iconRight,
      iconRight = _ref$iconRight === undefined ? null : _ref$iconRight;

  if (!subtitles) return null;
  return _react2['default'].createElement(
    'ul',
    { className: 'ola-field ola-field-subtitles' },
    subtitles.map(function (subtitle, idx) {
      var url = baseUrl + '#' + (0, _utilities.sanitizeAnchor)(subtitle);
      return _react2['default'].createElement(
        'li',
        { key: idx },
        _react2['default'].createElement(
          'a',
          { href: url },
          iconLeft,
          _react2['default'].createElement('span', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(subtitle) }),
          iconRight
        )
      );
    })
  );
};

module.exports = Subtitles;
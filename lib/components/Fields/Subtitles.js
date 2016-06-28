'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Subtitles = function Subtitles(_ref) {
  var subtitles = _ref.subtitles;
  var baseUrl = _ref.baseUrl;
  var _ref$iconLeft = _ref.iconLeft;
  var iconLeft = _ref$iconLeft === undefined ? null : _ref$iconLeft;
  var _ref$iconRight = _ref.iconRight;
  var iconRight = _ref$iconRight === undefined ? null : _ref$iconRight;

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
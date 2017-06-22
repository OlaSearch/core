'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _FieldLabel = require('./FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Subtitles = function Subtitles(_ref) {
  var subtitles = _ref.subtitles,
      baseUrl = _ref.baseUrl,
      _ref$iconLeft = _ref.iconLeft,
      iconLeft = _ref$iconLeft === undefined ? null : _ref$iconLeft,
      _ref$iconRight = _ref.iconRight,
      iconRight = _ref$iconRight === undefined ? null : _ref$iconRight,
      fieldLabel = _ref.fieldLabel;

  if (!subtitles) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-subtitles' },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    _react2['default'].createElement(
      'ul',
      null,
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
    )
  );
};

module.exports = Subtitles;
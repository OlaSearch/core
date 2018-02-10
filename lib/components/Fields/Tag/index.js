'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withLogger = require('./../../../decorators/withLogger');

var _withLogger2 = _interopRequireDefault(_withLogger);

var _user = require('@olasearch/icons/lib/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Tag(_ref) {
  var result = _ref.result,
      iconSize = _ref.iconSize,
      tagName = _ref.tagName,
      log = _ref.log,
      displayIcon = _ref.displayIcon,
      snippetId = _ref.snippetId;

  if (!tagName) return null;
  var classes = 'ola-field ola-field-tag';
  return _react2['default'].createElement(
    'div',
    { className: classes },
    _react2['default'].createElement(
      'a',
      { className: 'ola-flex ola-btn-tag' },
      displayIcon && _react2['default'].createElement(
        'span',
        { className: 'ola-flex-icon' },
        _react2['default'].createElement(_user2['default'], { size: iconSize })
      ),
      _react2['default'].createElement(
        'span',
        { className: 'ola-flex-content' },
        tagName
      )
    )
  );
}

Tag.defaultProps = {
  tagName: '',
  displayIcon: false,
  iconSize: 20
};

module.exports = (0, _withLogger2['default'])(Tag);
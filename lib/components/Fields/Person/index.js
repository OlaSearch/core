'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withLogger = require('./../../../decorators/withLogger');

var _withLogger2 = _interopRequireDefault(_withLogger);

var _user = require('@olasearch/icons/lib/user');

var _user2 = _interopRequireDefault(_user);

var _FieldLabel = require('./../FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Person(_ref) {
  var result = _ref.result,
      fieldLabel = _ref.fieldLabel,
      iconSize = _ref.iconSize,
      personName = _ref.personName,
      log = _ref.log,
      displayIcon = _ref.displayIcon,
      snippetId = _ref.snippetId;

  if (!personName) return null;
  var classes = 'ola-field ola-field-person';
  var url = result.url;

  return _react2['default'].createElement(
    'div',
    { className: classes },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    _react2['default'].createElement(
      'a',
      { className: 'ola-flex ola-btn-person', href: url, title: personName },
      displayIcon && _react2['default'].createElement(
        'span',
        { className: 'ola-flex-icon' },
        _react2['default'].createElement(_user2['default'], { size: iconSize })
      ),
      _react2['default'].createElement(
        'span',
        { className: 'ola-flex-content' },
        personName
      )
    )
  );
}

Person.defaultProps = {
  personName: '',
  fieldLabel: '',
  displayIcon: false,
  iconSize: 20
};

module.exports = (0, _withLogger2['default'])(Person);
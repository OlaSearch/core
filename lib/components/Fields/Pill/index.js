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

function Pill(_ref) {
  var fieldLabel = _ref.fieldLabel,
      iconSize = _ref.iconSize,
      pillName = _ref.pillName,
      log = _ref.log,
      displayIcon = _ref.displayIcon,
      snippetId = _ref.snippetId;

  if (!pillName) return null;
  if (typeof pillName === 'string') pillName = [pillName];
  var classes = 'ola-field ola-field-pill';

  var _ref2 = _react2['default'].createElement(
    'span',
    { className: 'ola-flex-icon' },
    _react2['default'].createElement(_user2['default'], { size: iconSize })
  );

  return _react2['default'].createElement(
    'div',
    { className: classes },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    pillName.map(function (item, index) {
      return _react2['default'].createElement(
        'span',
        { className: 'ola-flex ola-btn-pill', key: index },
        displayIcon && _ref2,
        _react2['default'].createElement(
          'span',
          { className: 'ola-flex-content' },
          item
        )
      );
    })
  );
}

Pill.defaultProps = {
  pillName: [],
  displayIcon: false,
  iconSize: 20
};

module.exports = (0, _withLogger2['default'])(Pill);
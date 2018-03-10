'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withLogger = require('./../../../decorators/withLogger');

var _withLogger2 = _interopRequireDefault(_withLogger);

var _user = require('@olasearch/icons/lib/user');

var _user2 = _interopRequireDefault(_user);

var _FieldLabel = require('./../FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

var _utilities = require('./../../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Pill(_ref) {
  var fieldLabel = _ref.fieldLabel,
      iconSize = _ref.iconSize,
      pillName = _ref.pillName,
      log = _ref.log,
      displayIcon = _ref.displayIcon,
      snippetId = _ref.snippetId;

  /* If there are no pills */
  if (!pillName || !pillName.length) return null;
  if (typeof pillName === 'string') pillName = [pillName];
  var classes = 'ola-field ola-field-pill';
  return _react2['default'].createElement(
    'div',
    { className: classes },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    pillName.map(function (name, idx) {
      return _react2['default'].createElement(
        'span',
        { className: 'ola-flex ola-btn-pill', key: idx },
        _react2['default'].createElement(
          'span',
          { className: 'ola-flex-content' },
          (0, _utilities.getDisplayName)(name)
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
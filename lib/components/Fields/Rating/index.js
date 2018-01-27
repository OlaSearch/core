'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FieldLabel = require('./../FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Rating(_ref) {
  var rating = _ref.rating,
      interval = _ref.interval,
      activeClass = _ref.activeClass,
      inActiveClass = _ref.inActiveClass,
      emptyClass = _ref.emptyClass,
      fieldLabel = _ref.fieldLabel;

  var normalized = rating / interval;
  var star = [];
  var total = Math.max(Math.ceil(normalized), 1);
  var maxInterval = 100 / interval;

  for (var i = 0; i < total; i++) {
    star.push(_react2['default'].createElement('em', { key: i, className: activeClass }));
  }

  for (var _i = total; _i < maxInterval; _i++) {
    star.push(_react2['default'].createElement('em', { key: _i, className: inActiveClass }));
  }

  if (!star.length) star = _react2['default'].createElement('em', { className: emptyClass });

  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-rating' },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    _react2['default'].createElement(
      'div',
      { className: 'ola-field-rating-stars' },
      star
    )
  );
}

Rating.defaultProps = {
  interval: 20,
  activeClass: 'ion ion-ios-star ola-rating-active',
  inActiveClass: 'ion ion-ios-star ola-rating-inactive',
  emptyClass: 'ion ion-ios-star'
};

module.exports = Rating;
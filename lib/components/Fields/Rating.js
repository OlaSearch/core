'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Rating = function Rating(_ref) {
  var rating = _ref.rating;
  var interval = _ref.interval;

  var normalized = rating / interval;
  var star = [];
  var total = Math.max(Math.ceil(normalized), 1);
  var maxInterval = 100 / interval;

  for (var i = 0; i < total; i++) {
    star.push(_react2['default'].createElement('em', { key: i, className: 'ion ion-ios-star ola-rating-active' }));
  }

  for (var _i = total; _i < maxInterval; _i++) {
    star.push(_react2['default'].createElement('em', { key: _i, className: 'ion ion-ios-star ola-rating-inactive' }));
  }

  if (!star.length) star = _react2['default'].createElement('em', { className: 'ion ion-ios-star' });

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet-rating' },
    star
  );
};

Rating.defaultProps = {
  interval: 20
};

module.exports = Rating;
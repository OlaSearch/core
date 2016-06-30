'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _ref2 = _react2['default'].createElement(
  'span',
  null,
  'Share:'
);

var Share = function Share(_ref) {
  var title = _ref.title;
  var url = _ref.url;
  var _window = window;
  var location = _window.location;

  var emailUrl = 'mailto:?&subject=' + title + '&body=' + url;
  var facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&title=' + title + '&redirect_uri=' + location.href;
  var twitterUrl = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-share-links' },
    _ref2,
    _react2['default'].createElement(
      'a',
      { href: emailUrl },
      'Email'
    ),
    _react2['default'].createElement(
      'a',
      { href: facebookUrl },
      'Facebook'
    ),
    _react2['default'].createElement(
      'a',
      { href: twitterUrl },
      'Twitter'
    )
  );
};

module.exports = Share;
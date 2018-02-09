'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withToggle = require('./../../decorators/withToggle');

var _withToggle2 = _interopRequireDefault(_withToggle);

var _reactOnclickoutside = require('@olasearch/react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _facebook = require('@olasearch/icons/lib/facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _twitter = require('@olasearch/icons/lib/twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _mail = require('@olasearch/icons/lib/mail');

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(_mail2['default'], null);

var _ref3 = _react2['default'].createElement(
  'span',
  { className: 'ola-drop-link-text' },
  'Email'
);

var _ref4 = _react2['default'].createElement(_facebook2['default'], null);

var _ref5 = _react2['default'].createElement(
  'span',
  { className: 'ola-drop-link-text' },
  'Facebook'
);

var _ref6 = _react2['default'].createElement(_twitter2['default'], null);

var _ref7 = _react2['default'].createElement(
  'span',
  { className: 'ola-drop-link-text' },
  'Twitter'
);

function Share(_ref) {
  var result = _ref.result,
      isCollapsed = _ref.isCollapsed,
      toggleDisplay = _ref.toggleDisplay;
  var title = result.title,
      url = result.url;
  var _window = window,
      location = _window.location;

  var emailUrl = 'mailto:?&subject=' + title + '&body=' + url;
  var facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&title=' + title + '&redirect_uri=' + location.href;
  var twitterUrl = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url;
  var classes = (0, _classnames2['default'])('ola-share-links', {
    'ola-drop-open': isCollapsed
  });
  return _react2['default'].createElement(
    'div',
    { className: classes },
    _react2['default'].createElement(
      'button',
      { className: 'ola-btn ola-btn-share', onClick: toggleDisplay },
      'Share'
    ),
    _react2['default'].createElement(
      'div',
      { className: 'ola-drop' },
      _react2['default'].createElement(
        'div',
        { className: 'ola-drop-body' },
        _react2['default'].createElement(
          'a',
          { className: 'ola-drop-link', href: emailUrl },
          _ref2,
          _ref3
        ),
        _react2['default'].createElement(
          'a',
          { className: 'ola-drop-link', href: facebookUrl },
          _ref4,
          _ref5
        ),
        _react2['default'].createElement(
          'a',
          { className: 'ola-drop-link', href: twitterUrl },
          _ref6,
          _ref7
        )
      )
    )
  );
}

var clickOutsideConfig = {
  handleClickOutside: function handleClickOutside(instance) {
    return function () {
      return instance ? instance.hide() : false;
    };
  }
};

exports['default'] = (0, _reactOnclickoutside2['default'])((0, _withToggle2['default'])(Share), clickOutsideConfig);
'use strict';

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withToggle = require('./../../../decorators/withToggle');

var _withToggle2 = _interopRequireDefault(_withToggle);

var _withLogger = require('./../../../decorators/withLogger');

var _withLogger2 = _interopRequireDefault(_withLogger);

var _withTheme = require('./../../../decorators/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _reactOnclickoutside = require('@olasearch/react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _facebook = require('@olasearch/icons/lib/facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _twitter = require('@olasearch/icons/lib/twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _mail = require('@olasearch/icons/lib/mail');

var _mail2 = _interopRequireDefault(_mail);

var _linkedin = require('@olasearch/icons/lib/linkedin');

var _linkedin2 = _interopRequireDefault(_linkedin);

var _materialGplus = require('@olasearch/icons/lib/material-gplus');

var _materialGplus2 = _interopRequireDefault(_materialGplus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref = _react2['default'].createElement(_mail2['default'], null);

var _ref2 = _react2['default'].createElement(
  'span',
  { className: 'ola-drop-link-text' },
  'Email'
);

var _ref3 = _react2['default'].createElement(_facebook2['default'], null);

var _ref4 = _react2['default'].createElement(
  'span',
  { className: 'ola-drop-link-text' },
  'Facebook'
);

var _ref5 = _react2['default'].createElement(_twitter2['default'], null);

var _ref6 = _react2['default'].createElement(
  'span',
  { className: 'ola-drop-link-text' },
  'Twitter'
);

var _ref7 = _react2['default'].createElement(_linkedin2['default'], null);

var _ref8 = _react2['default'].createElement(
  'span',
  { className: 'ola-drop-link-text' },
  'LinkedIn'
);

var _ref9 = _react2['default'].createElement(_materialGplus2['default'], null);

var _ref10 = _react2['default'].createElement(
  'span',
  { className: 'ola-drop-link-text' },
  'Google plus'
);

var Share = function (_React$PureComponent) {
  (0, _inherits3['default'])(Share, _React$PureComponent);

  function Share() {
    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Share);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleClick = function (e) {
      var url = e.currentTarget.getAttribute('data-href');
      var type = e.currentTarget.getAttribute('data-type');
      _this.props.log({
        eventType: 'C',
        result: _this.props.result,
        eventCategory: 'Share',
        eventAction: 'click',
        eventLabel: type,
        debounce: false,
        snippetId: _this.props.snippetId,
        payload: _this.props.logPayload
      });
      /**
       * Always open a new window
       */
      window.open(url);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  Share.prototype.render = function render() {
    var _props = this.props,
        result = _props.result,
        isCollapsed = _props.isCollapsed,
        toggleDisplay = _props.toggleDisplay,
        email = _props.email,
        facebook = _props.facebook,
        twitter = _props.twitter,
        linkedIn = _props.linkedIn,
        gplus = _props.gplus,
        rest = (0, _objectWithoutProperties3['default'])(_props, ['result', 'isCollapsed', 'toggleDisplay', 'email', 'facebook', 'twitter', 'linkedIn', 'gplus']);
    var title = result.title,
        url = result.url;
    var _window = window,
        location = _window.location;

    var emailUrl = 'mailto:?&subject=' + title + '&body=' + url;
    var facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&title=' + title + '&redirect_uri=' + location.href;
    var twitterUrl = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url;
    var linkedInUrl = 'https://www.linkedin.com/cws/share?url=' + url;
    var gplusUrl = 'https://plus.google.com/share?url=' + url;
    var classes = (0, _classnames2['default'])('ola-share-links', {
      'ola-drop-open': isCollapsed
    });
    return _react2['default'].createElement(
      'div',
      { className: classes },
      _react2['default'].createElement(
        'button',
        {
          className: 'ola-btn ola-btn-share',
          type: 'button',
          onClick: toggleDisplay
        },
        'Share'
      ),
      _react2['default'].createElement(
        'div',
        { className: 'ola-drop' },
        _react2['default'].createElement(
          'div',
          { className: 'ola-drop-body' },
          email && _react2['default'].createElement(
            'button',
            {
              type: 'button',
              className: 'ola-drop-link',
              'data-href': emailUrl,
              'data-type': 'email',
              onClick: this.handleClick
            },
            _ref,
            _ref2
          ),
          facebook && _react2['default'].createElement(
            'button',
            {
              type: 'button',
              className: 'ola-drop-link',
              'data-href': facebookUrl,
              'data-type': 'facebook',
              onClick: this.handleClick
            },
            _ref3,
            _ref4
          ),
          twitter && _react2['default'].createElement(
            'button',
            {
              type: 'button',
              className: 'ola-drop-link',
              'data-href': twitterUrl,
              'data-type': 'twitter',
              onClick: this.handleClick
            },
            _ref5,
            _ref6
          ),
          linkedIn && _react2['default'].createElement(
            'button',
            {
              type: 'button',
              className: 'ola-drop-link',
              'data-href': linkedInUrl,
              'data-type': 'linkedIn',
              onClick: this.handleClick
            },
            _ref7,
            _ref8
          ),
          gplus && _react2['default'].createElement(
            'button',
            {
              type: 'button',
              className: 'ola-drop-link',
              'data-href': gplusUrl,
              'data-type': 'gplus',
              onClick: this.handleClick
            },
            _ref9,
            _ref10
          )
        )
      )
    );
  };

  return Share;
}(_react2['default'].PureComponent);

Share.defaultProps = {
  email: false,
  facebook: true,
  twitter: true,
  linkedIn: true,
  gplus: true
};

Share.contextTypes = {
  document: _propTypes2['default'].object
};

module.exports = (0, _withLogger2['default'])((0, _withToggle2['default'])((0, _reactOnclickoutside2['default'])(Share, {
  handleClickOutside: function handleClickOutside(instance) {
    return function () {
      instance.props.hide();
    };
  },
  getDocument: function getDocument(instance) {
    /* Bug in react - onclickoutside: Functional components dont have access to context */
    return instance.context.document || document;
  }
})));
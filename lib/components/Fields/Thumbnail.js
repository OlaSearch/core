'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _omit = require('ramda/src/omit');

var _omit2 = _interopRequireDefault(_omit);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Thumbnail = function Thumbnail(props, context) {
  var _context$config = context.config,
      mediaQuery = _context$config.mediaQuery,
      cdn = _context$config.cdn;

  var thumbnail = props.thumbnail,
      thumbnailMobile = props.thumbnail_mobile,
      baseUrl = props.baseUrl,
      isLink = props.isLink,
      url = props.url,
      log = props.log,
      useBackgroundImage = props.useBackgroundImage,
      rest = _objectWithoutProperties(props, ['thumbnail', 'thumbnail_mobile', 'baseUrl', 'isLink', 'url', 'log', 'useBackgroundImage']);

  var restProps = (0, _omit2['default'])(['size', 'result', 'snippetId', 'collectionId', 'showIfEmpty'], rest);

  if (!thumbnail && !thumbnailMobile) return null;

  var isSvg = thumbnail.split('.').pop().indexOf('svg') === 0;
  /**
   * If cdn exists
   */

  if (cdn && !baseUrl && !isSvg) {
    baseUrl = cdn + '/';
    thumbnail = encodeURIComponent(thumbnail);
  }

  function handleClick(event) {
    log({
      eventType: 'C',
      result: props.result,
      eventCategory: 'Thumbnail',
      eventAction: 'click',
      snippetId: props.snippetId
    });
  }

  var linkProps = isLink ? {
    href: url,
    onClick: handleClick,
    className: 'ola-field ola-field-img ola-field-img-link'
  } : {};

  var imageUrl = '' + baseUrl + thumbnail;
  var imgThumbnail = useBackgroundImage ? _react2['default'].createElement('div', _extends({ className: 'ola-img ola-img-bg' }, restProps, { style: { backgroundImage: 'url(' + imageUrl + ')' } })) : _react2['default'].createElement('img', _extends({ className: 'ola-img' }, restProps, { src: '' + baseUrl + thumbnail, alt: '' }));

  if (!thumbnailMobile) {
    if (isLink) {
      return _react2['default'].createElement(
        'a',
        linkProps,
        imgThumbnail
      );
    }
    return imgThumbnail;
  }

  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-img' },
    _react2['default'].createElement(
      _reactResponsive2['default'],
      { query: mediaQuery.tablet },
      imgThumbnail
    ),
    _react2['default'].createElement(
      _reactResponsive2['default'],
      { query: mediaQuery.mobile },
      _react2['default'].createElement('img', _extends({ className: 'ola-img ola-img-mobile' }, restProps, { src: '' + baseUrl + thumbnailMobile, alt: '' }))
    )
  );
};

Thumbnail.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};

Thumbnail.defaultProps = {
  baseUrl: '',
  isLink: false,
  url: null,
  useBackgroundImage: false
};

module.exports = (0, _OlaLogger2['default'])(Thumbnail);
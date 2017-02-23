'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = require('../../../.babelhelper.js').interopRequireDefault(_reactResponsive);

var _omit = require('ramda/src/omit');

var _omit2 = require('../../../.babelhelper.js').interopRequireDefault(_omit);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaLogger);

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
      rest = require('../../../.babelhelper.js').objectWithoutProperties(props, ['thumbnail', 'thumbnail_mobile', 'baseUrl', 'isLink', 'url', 'log', 'useBackgroundImage']);

  var restProps = (0, _omit2['default'])(['size', 'result', 'snippetId', 'collectionId'], rest);

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
    className: 'ola-image-linked'
  } : {};

  var imageUrl = '' + baseUrl + thumbnail;
  var imgThumbnail = useBackgroundImage ? _react2['default'].createElement('div', require('../../../.babelhelper.js')['extends']({ className: 'ola-img ola-img-bg' }, restProps, { style: { backgroundImage: 'url(' + imageUrl + ')' } })) : _react2['default'].createElement('img', require('../../../.babelhelper.js')['extends']({ className: 'ola-img' }, restProps, { src: '' + baseUrl + thumbnail, alt: '' }));

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
    null,
    _react2['default'].createElement(
      _reactResponsive2['default'],
      { query: mediaQuery.tablet },
      imgThumbnail
    ),
    _react2['default'].createElement(
      _reactResponsive2['default'],
      { query: mediaQuery.mobile },
      _react2['default'].createElement('img', require('../../../.babelhelper.js')['extends']({ className: 'ola-img ola-img-mobile' }, restProps, { src: '' + baseUrl + thumbnailMobile, alt: '' }))
    )
  );
};

Thumbnail.contextTypes = {
  config: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, _react2['default'].PropTypes.func])
};

Thumbnail.defaultProps = {
  baseUrl: '',
  isLink: false,
  url: null,
  useBackgroundImage: false
};

module.exports = (0, _OlaLogger2['default'])(Thumbnail);
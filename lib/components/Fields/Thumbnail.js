'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('rambda/modules/omit');

var _omit2 = _interopRequireDefault(_omit);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Thumbnail(props, context) {
  var _context$config = context.config,
      mediaQuery = _context$config.mediaQuery,
      cdn = _context$config.cdn;
  var thumbnail = props.thumbnail,
      baseUrl = props.baseUrl,
      isLink = props.isLink,
      url = props.url,
      log = props.log,
      useBackgroundImage = props.useBackgroundImage,
      rest = (0, _objectWithoutProperties3['default'])(props, ['thumbnail', 'baseUrl', 'isLink', 'url', 'log', 'useBackgroundImage']);


  var restProps = (0, _omit2['default'])(['size', 'result', 'snippetId', 'collectionId', 'showIfEmpty'], rest);

  if (!thumbnail) return null;

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
    className: 'ola-img-link'
  } : {};

  var imageUrl = '' + baseUrl + thumbnail;
  var imgThumbnail = useBackgroundImage ? _react2['default'].createElement('div', (0, _extends3['default'])({
    className: 'ola-img ola-img-bg'
  }, restProps, {
    style: { backgroundImage: 'url(' + imageUrl + ')' }
  })) : _react2['default'].createElement('img', (0, _extends3['default'])({
    className: 'ola-img'
  }, restProps, {
    src: '' + baseUrl + thumbnail,
    alt: ''
  }));

  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-img' },
    isLink ? _react2['default'].createElement(
      'a',
      linkProps,
      imgThumbnail
    ) : imgThumbnail
  );
}

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
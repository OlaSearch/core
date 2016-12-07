'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = require('../../../.babelhelper.js').interopRequireDefault(_reactResponsive);

var _omit = require('ramda/src/omit');

var _omit2 = require('../../../.babelhelper.js').interopRequireDefault(_omit);

var Thumbnail = function Thumbnail(props, context) {
  var _context$config = context.config;
  var mediaQuery = _context$config.mediaQuery;
  var cdn = _context$config.cdn;
  var thumbnail = props.thumbnail;
  var thumbnailMobile = props.thumbnail_mobile;
  var baseUrl = props.baseUrl;

  var rest = require('../../../.babelhelper.js').objectWithoutProperties(props, ['thumbnail', 'thumbnail_mobile', 'baseUrl']);

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

  if (!thumbnailMobile) {
    return _react2['default'].createElement('img', require('../../../.babelhelper.js')['extends']({ onError: function onError(event) {
        event.target.style = 'display:none;';
      }, className: 'ola-img' }, restProps, { src: '' + baseUrl + thumbnail, alt: '' }));
  }

  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      _reactResponsive2['default'],
      { query: mediaQuery.tablet },
      _react2['default'].createElement('img', require('../../../.babelhelper.js')['extends']({ className: 'ola-img ola-img-desktop' }, restProps, { src: '' + baseUrl + thumbnail, alt: '' }))
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
  baseUrl: ''
};

module.exports = Thumbnail;
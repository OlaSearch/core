'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = require('../../../.babelhelper.js').interopRequireDefault(_reactResponsive);

var Thumbnail = function Thumbnail(props, context) {
  var mediaQuery = context.config.mediaQuery;
  var thumbnail = props.thumbnail;
  var thumbnailMobile = props.thumbnail_mobile;
  var result = props.result;

  var rest = require('../../../.babelhelper.js').objectWithoutProperties(props, ['thumbnail', 'thumbnail_mobile', 'result']);

  if (!thumbnail && !thumbnailMobile) return null;

  if (!thumbnailMobile) {
    return _react2['default'].createElement('img', require('../../../.babelhelper.js')['extends']({ className: 'ola-img' }, rest, { src: thumbnail, alt: '' }));
  }

  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      _reactResponsive2['default'],
      { query: mediaQuery.tablet },
      _react2['default'].createElement('img', require('../../../.babelhelper.js')['extends']({ className: 'ola-img ola-img-desktop' }, rest, { src: thumbnail, alt: '' }))
    ),
    _react2['default'].createElement(
      _reactResponsive2['default'],
      { query: mediaQuery.mobile },
      _react2['default'].createElement('img', require('../../../.babelhelper.js')['extends']({ className: 'ola-img ola-img-mobile' }, rest, { src: thumbnailMobile, alt: '' }))
    )
  );
};

Thumbnail.contextTypes = {
  config: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, _react2['default'].PropTypes.func])
};

module.exports = Thumbnail;
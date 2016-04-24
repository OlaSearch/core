'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Thumbnail = function Thumbnail(props, context) {
  var mediaQuery = context.config.mediaQuery;
  var thumbnail = props.thumbnail;
  var thumbnail_mobile = props.thumbnail_mobile;

  var rest = _objectWithoutProperties(props, ['thumbnail', 'thumbnail_mobile']);

  if (!thumbnail_mobile) {
    return _react2['default'].createElement('img', _extends({ className: 'ola-img' }, rest, { src: thumbnail, alt: '' }));
  }

  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      _reactResponsive2['default'],
      { query: mediaQuery.tablet },
      _react2['default'].createElement('img', _extends({ className: 'ola-img ola-img-desktop' }, rest, { src: thumbnail, alt: '' }))
    ),
    _react2['default'].createElement(
      _reactResponsive2['default'],
      { query: mediaQuery.mobile },
      _react2['default'].createElement('img', _extends({ className: 'ola-img ola-img-mobile' }, rest, { src: thumbnail_mobile, alt: '' }))
    )
  );
};

Thumbnail.contextTypes = {
  config: _react2['default'].PropTypes.object
};

Thumbnail.propTypes = {
  thumbnail: _react2['default'].PropTypes.string,
  thumbnail_mobile: _react2['default'].PropTypes.string
};

module.exports = Thumbnail;
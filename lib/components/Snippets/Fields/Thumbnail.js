'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMq = require('react-mq');

var _reactMq2 = _interopRequireDefault(_reactMq);

var Thumbnail = function Thumbnail(props, context) {
	var mediaQuery = context.config.mediaQuery;
	var thumbnail = props.thumbnail;
	var thumbnail_mobile = props.thumbnail_mobile;

	return _react2['default'].createElement(
		'div',
		null,
		_react2['default'].createElement(
			_reactMq2['default'],
			{ query: mediaQuery.tablet },
			_react2['default'].createElement('img', { className: 'ola-snippet-image-desktop', src: thumbnail, width: '158', alt: '' })
		),
		_react2['default'].createElement(
			_reactMq2['default'],
			{ query: mediaQuery.mobile },
			_react2['default'].createElement('img', { className: 'ola-snippet-image-mobile', src: thumbnail_mobile, width: '320', alt: '' })
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
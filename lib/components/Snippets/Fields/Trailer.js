'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// import Modal from 'react-modal';

var _constantsStyles = require('./../../../constants/styles');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _jqueryParam = require('jquery-param');

var _jqueryParam2 = _interopRequireDefault(_jqueryParam);

var Trailer = (function (_React$Component) {
	_inherits(Trailer, _React$Component);

	function Trailer(props) {
		var _this = this;

		_classCallCheck(this, Trailer);

		_get(Object.getPrototypeOf(Trailer.prototype), 'constructor', this).call(this, props);

		this.closeModal = function () {

			_this.setState({
				isModalOpen: false,
				videoUrl: ''
			});
		};

		this.openModal = function () {
			var _props = _this.props;
			var title = _props.title;
			var year = _props.year;

			var href = 'https://www.googleapis.com/youtube/v3/search';

			var data = {
				q: 'Trailer ' + title + ' ' + year,
				part: 'snippet',
				key: 'AIzaSyDd1ikysxUDeOGibCKEVriKTwpQjKiJ7IM',
				type: 'video'
			};

			(0, _isomorphicFetch2['default'])(href + '?' + (0, _jqueryParam2['default'])(data), {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}).then(function (response) {
				return response.json();
			}).then(function (response) {
				var items = response.items;

				if (!items.length) {
					alert('Could not find a trailer for this movie.');
					return;
				}
				var videoId = items[0].id.videoId;

				_this.setState({
					videoUrl: 'https://www.youtube.com/embed/' + videoId,
					isModalOpen: true
				});
			});
		};

		this.state = {
			isModalOpen: false,
			videoUrl: ''
		};
	}

	_createClass(Trailer, [{
		key: 'render',
		value: function render() {
			var _state = this.state;
			var isModalOpen = _state.isModalOpen;
			var videoUrl = _state.videoUrl;

			return _react2['default'].createElement(
				'div',
				{ className: 'ola-view-trailer' },
				_react2['default'].createElement(
					'button',
					{ className: 'ola-btn ola-btn-trailer ola-btn__full', onClick: this.openModal },
					'View trailer'
				),
				_react2['default'].createElement(
					Modal,
					{
						isOpen: isModalOpen,
						onRequestClose: this.closeModal,
						style: _constantsStyles.modal },
					_react2['default'].createElement('iframe', {
						width: '560',
						height: '315',
						src: videoUrl,
						frameBorder: '0',
						allowFullScreen: true })
				)
			);
		}
	}]);

	return Trailer;
})(_react2['default'].Component);

exports['default'] = Trailer;
module.exports = exports['default'];
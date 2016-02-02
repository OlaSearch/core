'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Bookmarks = require('./../../actions/Bookmarks');

var _decorator = require('react-onclickoutside/decorator');

var _decorator2 = _interopRequireDefault(_decorator);

var _Bookmark = require('./Bookmark');

var _Bookmark2 = _interopRequireDefault(_Bookmark);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bookmarks = function (_React$Component) {
	_inherits(Bookmarks, _React$Component);

	function Bookmarks(props) {
		_classCallCheck(this, Bookmarks);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bookmarks).call(this, props));

		_this.handleClickOutside = function (event) {

			_this.setState({
				isOpen: false
			});
		};

		_this.toggleVisibility = function () {

			_this.setState({
				isOpen: !_this.state.isOpen
			});
		};

		_this.onRemove = function (bookmark) {

			_this.props.dispatch((0, _Bookmarks.removeBookmark)(bookmark));
		};

		_this.state = {
			isOpen: false
		};
		return _this;
	}

	_createClass(Bookmarks, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var bookmarks = this.props.bookmarks;
			var isOpen = this.state.isOpen;

			var klass = (0, _classnames2.default)({
				'ola-module': true,
				'js-hide': !isOpen
			});

			return _react2.default.createElement(
				'div',
				{ className: 'ola-bookmarks-container' },
				_react2.default.createElement('button', { type: 'button', className: 'ola-link-bookmark', onClick: this.toggleVisibility, 'aria-label': 'Show bookmarks' }),
				_react2.default.createElement(
					'div',
					{ className: klass },
					_react2.default.createElement(
						'div',
						{ className: 'ola-module-title' },
						'Bookmarks'
					),
					_react2.default.createElement(
						'div',
						{ className: 'ola-module-body' },
						!bookmarks.length ? _react2.default.createElement(
							'div',
							{ className: 'ola-module-item' },
							'Your bookmarks will show here.'
						) : null,
						bookmarks.map(function (bookmark, idx) {

							return _react2.default.createElement(_Bookmark2.default, {
								bookmark: bookmark,
								onRemove: _this2.onRemove.bind(_this2, bookmark),
								key: idx
							});
						})
					)
				)
			);
		}
	}]);

	return Bookmarks;
}(_react2.default.Component);

Bookmarks.propTypes = {
	dispatch: _react2.default.PropTypes.func.isRequired,
	bookmarks: _react2.default.PropTypes.array.isRequired
};

function mapStateToProps(state) {

	return {
		bookmarks: state.AppState.bookmarks
	};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _decorator2.default)(Bookmarks));
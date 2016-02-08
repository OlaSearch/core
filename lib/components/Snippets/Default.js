'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _Bookmark = require('./Actions/Bookmark');

var _Bookmark2 = _interopRequireDefault(_Bookmark);

var _Title = require('./Fields/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Thumbnail = require('./Fields/Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _Rating = require('./Fields/Rating');

var _Rating2 = _interopRequireDefault(_Rating);

var _Summary = require('./Fields/Summary');

var _Summary2 = _interopRequireDefault(_Summary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Default = function (_React$Component) {
	_inherits(Default, _React$Component);

	function Default(props) {
		_classCallCheck(this, Default);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Default).call(this, props));
	}

	_createClass(Default, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var result = _props.result;
			var isAutosuggest = _props.isAutosuggest;
			var showSummary = _props.showSummary;

			return _react2.default.createElement(
				'div',
				{ className: 'ola-snippet' },
				_react2.default.createElement(
					'div',
					{ className: 'ola-snippet-image' },
					_react2.default.createElement(_Thumbnail2.default, {
						thumbnail: result.thumbnail,
						thumbnail_mobile: result.thumbnail_mobile
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'ola-snippet-content' },
					_react2.default.createElement(
						'div',
						{ className: 'ola-snippet-actions' },
						_react2.default.createElement(_Bookmark2.default, this.props)
					),
					_react2.default.createElement(_Title2.default, {
						result: result
					}),
					_react2.default.createElement(_Rating2.default, {
						rating: result.star_rating
					}),
					showSummary ? _react2.default.createElement(_Summary2.default, { result: result }) : null,
					result.directors ? _react2.default.createElement(
						'p',
						null,
						(0, _utilities.arrayJoin)('By ', result.directors)
					) : null
				)
			);
		}
	}]);

	return Default;
}(_react2.default.Component);

Default.defaultProps = {
	showTrailer: true,
	showSummary: true
};
Default.propTypes = {
	dispatch: _react2.default.PropTypes.func.isRequired,
	result: _react2.default.PropTypes.object,
	bookmarks: _react2.default.PropTypes.array
};
Default.displayName = "DefaultSnippet";

module.exports = Default;
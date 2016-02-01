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

var _utilities = require('./../../utilities');

var _ActionsBookmark = require('./Actions/Bookmark');

var _ActionsBookmark2 = _interopRequireDefault(_ActionsBookmark);

var _FieldsTitle = require('./Fields/Title');

var _FieldsTitle2 = _interopRequireDefault(_FieldsTitle);

var _FieldsThumbnail = require('./Fields/Thumbnail');

var _FieldsThumbnail2 = _interopRequireDefault(_FieldsThumbnail);

var _FieldsRating = require('./Fields/Rating');

var _FieldsRating2 = _interopRequireDefault(_FieldsRating);

var _FieldsTrailer = require('./Fields/Trailer');

var _FieldsTrailer2 = _interopRequireDefault(_FieldsTrailer);

var _FieldsSummary = require('./Fields/Summary');

var _FieldsSummary2 = _interopRequireDefault(_FieldsSummary);

var Default = (function (_React$Component) {
	_inherits(Default, _React$Component);

	function Default(props) {
		_classCallCheck(this, Default);

		_get(Object.getPrototypeOf(Default.prototype), 'constructor', this).call(this, props);
	}

	_createClass(Default, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var result = _props.result;
			var isAutocomplete = _props.isAutocomplete;
			var showSummary = _props.showSummary;

			return _react2['default'].createElement(
				'div',
				{ className: 'ola-snippet' },
				_react2['default'].createElement(
					'div',
					{ className: 'ola-snippet-image' },
					_react2['default'].createElement(_FieldsThumbnail2['default'], {
						thumbnail: result.thumbnail,
						thumbnail_mobile: result.thumbnail_mobile
					}),
					!isAutocomplete ? _react2['default'].createElement(_FieldsTrailer2['default'], {
						title: result.title,
						year: result.year
					}) : null
				),
				_react2['default'].createElement(
					'div',
					{ className: 'ola-snippet-content' },
					_react2['default'].createElement(
						'div',
						{ className: 'ola-snippet-actions' },
						_react2['default'].createElement(_ActionsBookmark2['default'], this.props)
					),
					_react2['default'].createElement(_FieldsTitle2['default'], {
						result: result
					}),
					_react2['default'].createElement(_FieldsRating2['default'], {
						rating: result.star_rating
					}),
					showSummary ? _react2['default'].createElement(_FieldsSummary2['default'], { result: result }) : null,
					result.directors ? _react2['default'].createElement(
						'p',
						null,
						(0, _utilities.arrayJoin)('By ', result.directors)
					) : null
				)
			);
		}
	}], [{
		key: 'defaultProps',
		value: {
			showTrailer: true,
			showSummary: true
		},
		enumerable: true
	}, {
		key: 'propTypes',
		value: {
			dispatch: _react2['default'].PropTypes.func.isRequired,
			result: _react2['default'].PropTypes.object,
			bookmarks: _react2['default'].PropTypes.array
		},
		enumerable: true
	}, {
		key: 'displayName',
		value: "DefaultSnippet",
		enumerable: true
	}]);

	return Default;
})(_react2['default'].Component);

exports['default'] = Default;
module.exports = exports['default'];
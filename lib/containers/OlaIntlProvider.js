'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translations = require('./../translations');

var defaultTranslations = _interopRequireWildcard(_translations);

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

var _reactIntlLibLocaleDataEn = require('react-intl/lib/locale-data/en');

var _reactIntlLibLocaleDataEn2 = _interopRequireDefault(_reactIntlLibLocaleDataEn);

(0, _reactIntl.addLocaleData)(_reactIntlLibLocaleDataEn2['default']);

var OlaIntlProvider = (function (_React$Component) {
	_inherits(OlaIntlProvider, _React$Component);

	function OlaIntlProvider() {
		_classCallCheck(this, OlaIntlProvider);

		_get(Object.getPrototypeOf(OlaIntlProvider.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(OlaIntlProvider, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var translations = _props.translations;
			var lang = _props.lang;
			var children = _props.children;

			var activeTranslation = lang && translations ? translations[lang] : {};

			var _extends2 = _extends({}, defaultTranslations[lang], activeTranslation);

			var locales = _extends2.locales;
			var messages = _extends2.messages;

			return _react2['default'].createElement(
				_reactIntl.IntlProvider,
				{ locale: locales, messages: messages },
				_react2['default'].cloneElement(children, this.props)
			);
		}
	}], [{
		key: 'defaultProps',
		value: {
			lang: 'en',
			translations: {}
		},
		enumerable: true
	}]);

	return OlaIntlProvider;
})(_react2['default'].Component);

exports['default'] = OlaIntlProvider;
;
module.exports = exports['default'];
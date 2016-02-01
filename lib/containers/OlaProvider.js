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

var _reactRedux = require('react-redux');

var _OlaIntlProvider = require('./OlaIntlProvider');

var _OlaIntlProvider2 = _interopRequireDefault(_OlaIntlProvider);

var OlaProvider = (function (_React$Component) {
	_inherits(OlaProvider, _React$Component);

	_createClass(OlaProvider, null, [{
		key: 'displayName',
		value: 'OlaProvider',
		enumerable: true
	}, {
		key: 'childContextTypes',
		value: {
			config: _react2['default'].PropTypes.object
		},
		enumerable: true
	}]);

	function OlaProvider(props) {
		_classCallCheck(this, OlaProvider);

		_get(Object.getPrototypeOf(OlaProvider.prototype), 'constructor', this).call(this, props);

		var _props = this.props;
		var config = _props.config;
		var parser = _props.parser;
		var queryBuilder = _props.queryBuilder;
		var searchService = _props.searchService;
		var store = _props.store;

		if (!config || !parser || !queryBuilder || !searchService || !store) {

			var namePart = this.constructor.displayName ? " of " + this.constructor.displayName : "";
			throw new Error("Could not find config, parser, queryBuilder, searchService, store on this.props " + namePart);
		}
	}

	_createClass(OlaProvider, [{
		key: 'getChildContext',
		value: function getChildContext() {

			return {
				config: this.props.config
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var translations = _props2.translations;
			var children = _props2.children;
			var lang = _props2.lang;
			var store = _props2.store;

			return _react2['default'].createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2['default'].createElement(
					_OlaIntlProvider2['default'],
					{ translations: translations, lang: lang },
					children
				)
			);
		}
	}]);

	return OlaProvider;
})(_react2['default'].Component);

exports['default'] = OlaProvider;
module.exports = exports['default'];
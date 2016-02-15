'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.OlaRoute = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var OlaRoute = exports.OlaRoute = function OlaRoute(ComposedComponent) {
	var _class, _temp;

	return _temp = _class = function (_React$Component) {
		_inherits(_class, _React$Component);

		function _class(props) {
			_classCallCheck(this, _class);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props));

			_this.onPopState = function () {

				_this.props.dispatch((0, _Search.initSearch)({ config: _this.context.config }));
			};

			return _this;
		}

		_createClass(_class, [{
			key: 'componentWillMount',
			value: function componentWillMount() {

				window.addEventListener('popstate', this.onPopState);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {

				window.removeEventListener('popstate', this.onPopState);
			}
		}, {
			key: 'render',
			value: function render() {

				return _react2.default.createElement(ComposedComponent, this.props);
			}
		}]);

		return _class;
	}(_react2.default.Component), _class.displayName = 'OlaRoute', _class.contextTypes = {
		config: _react2.default.PropTypes.object
	}, _temp;
};
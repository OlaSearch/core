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

var _actionsHistory = require('./../../actions/History');

var _reactOnclickoutsideDecorator = require('react-onclickoutside/decorator');

var _reactOnclickoutsideDecorator2 = _interopRequireDefault(_reactOnclickoutsideDecorator);

var _HistoryItem = require('./HistoryItem');

var _HistoryItem2 = _interopRequireDefault(_HistoryItem);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var History = (function (_React$Component) {
	_inherits(History, _React$Component);

	_createClass(History, null, [{
		key: 'propTypes',
		value: {
			dispatch: _react2['default'].PropTypes.func.isRequired,
			history: _react2['default'].PropTypes.array.isRequired
		},
		enumerable: true
	}]);

	function History(props) {
		var _this = this;

		_classCallCheck(this, _History);

		_get(Object.getPrototypeOf(_History.prototype), 'constructor', this).call(this, props);

		this.handleClickOutside = function (event) {

			_this.setState({
				isOpen: false
			});
		};

		this.toggleVisibility = function () {

			_this.setState({
				isOpen: !_this.state.isOpen
			});
		};

		this.clearHistory = function () {

			_this.props.dispatch((0, _actionsHistory.clearHistory)());
		};

		this.state = {
			isOpen: false
		};
	}

	_createClass(History, [{
		key: 'render',
		value: function render() {
			var history = this.props.history;
			var isOpen = this.state.isOpen;

			var klass = (0, _classnames2['default'])({
				'ola-module': true,
				'js-hide': !isOpen
			});

			return _react2['default'].createElement(
				'div',
				{ className: 'ola-history-container' },
				_react2['default'].createElement('button', {
					type: 'button',
					className: 'ola-link-history',
					onClick: this.toggleVisibility, 'aria-label': 'Show history' }),
				_react2['default'].createElement(
					'div',
					{ className: klass },
					_react2['default'].createElement(
						'div',
						{ className: 'ola-module-title' },
						_react2['default'].createElement(
							'span',
							null,
							'History '
						),
						_react2['default'].createElement(
							'button',
							{ type: 'button', className: 'ola-fake-button ola-clear', onClick: this.clearHistory },
							'(clear)'
						)
					),
					_react2['default'].createElement(
						'div',
						{ className: 'ola-module-body' },
						!history.length ? _react2['default'].createElement(
							'div',
							{ className: 'ola-module-item' },
							'Your history will show here.'
						) : null,
						history.map(function (item, idx) {

							return _react2['default'].createElement(_HistoryItem2['default'], {
								history: item,
								key: idx
							});
						})
					)
				)
			);
		}
	}]);

	var _History = History;
	History = (0, _reactOnclickoutsideDecorator2['default'])()(History) || History;
	History = (0, _reactRedux.connect)(function (state) {
		return {
			history: state.AppState.history
		};
	})(History) || History;
	return History;
})(_react2['default'].Component);

exports['default'] = History;
module.exports = exports['default'];
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

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _InfiniteScrollLoadMore = require('./InfiniteScroll/LoadMore');

var _InfiniteScrollLoadMore2 = _interopRequireDefault(_InfiniteScrollLoadMore);

var _actionsSearch = require('./../actions/Search');

var SearchActionCreators = _interopRequireWildcard(_actionsSearch);

var _redux = require('redux');

var SearchFooter = (function (_React$Component) {
	_inherits(SearchFooter, _React$Component);

	function SearchFooter(props) {
		_classCallCheck(this, SearchFooter);

		_get(Object.getPrototypeOf(SearchFooter.prototype), 'constructor', this).call(this, props);
	}

	_createClass(SearchFooter, [{
		key: 'render',
		value: function render() {
			var infiniteScroll = this.context.config.infiniteScroll;
			var _props = this.props;
			var isPhone = _props.isPhone;
			var dispatch = _props.dispatch;

			var boundActionCreators = (0, _redux.bindActionCreators)(SearchActionCreators, dispatch);

			if (infiniteScroll || isPhone) {

				return _react2['default'].createElement(_InfiniteScrollLoadMore2['default'], _extends({}, this.props, { actions: boundActionCreators }));
			}

			return _react2['default'].createElement(_Pagination2['default'], _extends({}, this.props, { actions: boundActionCreators }));
		}
	}], [{
		key: 'contextTypes',
		value: {
			config: _react2['default'].PropTypes.object
		},
		enumerable: true
	}]);

	return SearchFooter;
})(_react2['default'].Component);

exports['default'] = SearchFooter;
module.exports = exports['default'];
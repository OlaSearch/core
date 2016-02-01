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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Pagination = (function (_React$Component) {
	_inherits(Pagination, _React$Component);

	function Pagination(props) {
		var _this = this;

		_classCallCheck(this, Pagination);

		_get(Object.getPrototypeOf(Pagination.prototype), 'constructor', this).call(this, props);

		this.prevPage = function () {
			var currentPage = _this.props.currentPage;

			--currentPage;

			if (currentPage < 1) {
				currentPage = 1;
			}

			_this.selectPage(currentPage);
		};

		this.nextPage = function () {
			var _props = _this.props;
			var currentPage = _props.currentPage;
			var totalResults = _props.totalResults;
			var perPage = _props.perPage;
			var totalPages = Math.ceil(totalResults / perPage);

			++currentPage;

			if (currentPage > totalPages) {
				currentPage = totalPages;
			}

			_this.selectPage(currentPage);
		};
	}

	_createClass(Pagination, [{
		key: 'selectPage',
		value: function selectPage(page) {
			var actions = this.props.actions;

			actions.changePage(page);

			actions.executeSearch();
		}
	}, {
		key: 'createPageList',
		value: function createPageList(start, end, limit, left, right, ellipsis) {

			var list = [];

			for (var i = start; i <= end; i++) {

				if (i == 1 || i == parseInt(end) || end < limit) {

					list.push(i);
				} else {

					if (i == right + 1 || i == left - 1) list.push(ellipsis);

					if (i <= right && i >= left) list.push(i);
				}
			}

			return list;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props;
			var totalResults = _props2.totalResults;
			var perPage = _props2.perPage;
			var currentPage = _props2.currentPage;
			var edges = _props2.edges;
			var limit = _props2.limit;
			var ellipsis = _props2.ellipsis;

			var totalPages = Math.ceil(totalResults / perPage);

			var start = 1,
			    left = Math.max(parseInt(currentPage) - edges, 0),
			    right = Math.min(parseInt(currentPage) + edges, totalPages);

			var pages = this.createPageList(start, totalPages, limit, left, right, ellipsis);

			var prevPageClass = (0, _classnames2['default'])({
				'ola-page ola-page-previous': true,
				'ola-page-disabled': currentPage == 1
			});

			var nextPageClass = (0, _classnames2['default'])({
				'ola-page ola-page-next': true,
				'ola-page-disabled': currentPage == totalPages
			});

			return _react2['default'].createElement(
				'nav',
				{ className: 'ola-pagination' },
				_react2['default'].createElement(
					'button',
					{ className: prevPageClass, onClick: this.prevPage },
					'Previous'
				),
				pages.map(function (page, idx) {

					var klass = (0, _classnames2['default'])({
						'ola-page': true,
						'ola-page-current': currentPage == page,
						'ola-page-ellipsis': page == ellipsis
					});

					return _react2['default'].createElement(
						'button',
						{
							className: klass,
							key: idx,
							onClick: function () {
								if (page == ellipsis) return;
								_this2.selectPage(page);
							}
						},
						page
					);
				}),
				_react2['default'].createElement(
					'button',
					{ className: nextPageClass, onClick: this.nextPage },
					'Next'
				)
			);
		}
	}], [{
		key: 'defaultProps',
		value: {
			ellipsis: '...',
			edges: 2,
			limit: 10,
			perPage: 10,
			currentPage: 1,
			totalResults: 0
		},
		enumerable: true
	}, {
		key: 'propTypes',
		value: {
			totalResults: _react2['default'].PropTypes.number.isRequired,
			currentPage: _react2['default'].PropTypes.any,
			perPage: _react2['default'].PropTypes.any.isRequired,
			actions: _react2['default'].PropTypes.shape({
				changePage: _react2['default'].PropTypes.func.isRequired,
				executeSearch: _react2['default'].PropTypes.func.isRequired
			})
		},
		enumerable: true
	}]);

	return Pagination;
})(_react2['default'].Component);

exports['default'] = Pagination;
module.exports = exports['default'];
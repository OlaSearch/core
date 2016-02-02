'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_React$Component) {
	_inherits(Pagination, _React$Component);

	function Pagination(props) {
		_classCallCheck(this, Pagination);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Pagination).call(this, props));

		_this.prevPage = function () {
			var currentPage = _this.props.currentPage;

			--currentPage;

			if (currentPage < 1) {
				currentPage = 1;
			}

			_this.selectPage(currentPage);
		};

		_this.nextPage = function () {
			var _this$props = _this.props;
			var currentPage = _this$props.currentPage;
			var totalResults = _this$props.totalResults;
			var perPage = _this$props.perPage;
			var totalPages = Math.ceil(totalResults / perPage);

			++currentPage;

			if (currentPage > totalPages) {
				currentPage = totalPages;
			}

			_this.selectPage(currentPage);
		};

		return _this;
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

			var _props = this.props;
			var totalResults = _props.totalResults;
			var perPage = _props.perPage;
			var currentPage = _props.currentPage;
			var edges = _props.edges;
			var limit = _props.limit;
			var ellipsis = _props.ellipsis;

			var totalPages = Math.ceil(totalResults / perPage);

			var start = 1,
			    left = Math.max(parseInt(currentPage) - edges, 0),
			    right = Math.min(parseInt(currentPage) + edges, totalPages);

			var pages = this.createPageList(start, totalPages, limit, left, right, ellipsis);

			var prevPageClass = (0, _classnames2.default)({
				'ola-page ola-page-previous': true,
				'ola-page-disabled': currentPage == 1
			});

			var nextPageClass = (0, _classnames2.default)({
				'ola-page ola-page-next': true,
				'ola-page-disabled': currentPage == totalPages
			});

			return _react2.default.createElement(
				'nav',
				{ className: 'ola-pagination' },
				_react2.default.createElement(
					'button',
					{ className: prevPageClass, onClick: this.prevPage },
					'Previous'
				),
				pages.map(function (page, idx) {

					var klass = (0, _classnames2.default)({
						'ola-page': true,
						'ola-page-current': currentPage == page,
						'ola-page-ellipsis': page == ellipsis
					});

					return _react2.default.createElement(
						'button',
						{
							className: klass,
							key: idx,
							onClick: function onClick() {
								if (page == ellipsis) return;
								_this2.selectPage(page);
							}
						},
						page
					);
				}),
				_react2.default.createElement(
					'button',
					{ className: nextPageClass, onClick: this.nextPage },
					'Next'
				)
			);
		}
	}]);

	return Pagination;
}(_react2.default.Component);

Pagination.defaultProps = {
	ellipsis: '...',
	edges: 2,
	limit: 10,
	perPage: 10,
	currentPage: 1,
	totalResults: 0
};
Pagination.propTypes = {
	totalResults: _react2.default.PropTypes.number.isRequired,
	currentPage: _react2.default.PropTypes.any,
	perPage: _react2.default.PropTypes.any.isRequired,
	actions: _react2.default.PropTypes.shape({
		changePage: _react2.default.PropTypes.func.isRequired,
		executeSearch: _react2.default.PropTypes.func.isRequired
	})
};
exports.default = Pagination;
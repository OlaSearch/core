'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_React$Component) {
  _inherits(Pagination, _React$Component);

  function Pagination() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Pagination)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.prevPage = function () {
      var currentPage = _this.props.currentPage;


      --currentPage;

      if (currentPage < 1) currentPage = 1;

      _this.selectPage(currentPage);
    }, _this.nextPage = function () {
      var _this$props = _this.props;
      var currentPage = _this$props.currentPage;
      var totalResults = _this$props.totalResults;
      var perPage = _this$props.perPage;

      var totalPages = Math.ceil(totalResults / perPage);

      ++currentPage;

      if (currentPage > totalPages) currentPage = totalPages;

      _this.selectPage(currentPage);
    }, _this.selectPage = function (page) {
      var _this$props2 = _this.props;
      var actions = _this$props2.actions;
      var onChangePage = _this$props2.onChangePage;


      onChangePage ? onChangePage.call(_this) : _this.refs.pagination.parentNode.scrollIntoView();

      actions.changePage(page);

      actions.executeSearch();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pagination, [{
    key: 'createPageList',
    value: function createPageList(start, end, limit, left, right, ellipsis) {
      var list = [];
      for (var i = start; i <= end; i++) {
        if (i === 1 || i === parseInt(end) || end < limit) {
          list.push(i);
        } else {
          if (i === right + 1 || i === left - 1) list.push(ellipsis);

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


      var currentPageInt = parseInt(currentPage);
      var totalPages = Math.ceil(totalResults / perPage);
      var start = 1;
      var left = Math.max(currentPageInt - edges, 0);
      var right = Math.min(currentPageInt + edges, totalPages);
      var pages = this.createPageList(start, totalPages, limit, left, right, ellipsis);

      var prevPageClass = (0, _classnames2['default'])('ola-page ola-page-previous', {
        'ola-page-disabled': currentPageInt === 1
      });

      var nextPageClass = (0, _classnames2['default'])({
        'ola-page ola-page-next': true,
        'ola-page-disabled': currentPageInt === totalPages || !totalPages
      });

      return _react2['default'].createElement(
        'nav',
        { className: 'ola-pagination', ref: 'pagination' },
        _react2['default'].createElement(
          'button',
          { className: prevPageClass, onClick: this.prevPage },
          'Previous'
        ),
        pages.map(function (page, idx) {
          return _react2['default'].createElement(PageNumber, {
            selectPage: _this2.selectPage,
            page: page,
            key: idx,
            currentPage: currentPageInt
          });
        }),
        _react2['default'].createElement(
          'button',
          { className: nextPageClass, onClick: this.nextPage },
          'Next'
        )
      );
    }
  }]);

  return Pagination;
}(_react2['default'].Component);

/**
 * Page Number
 */


Pagination.defaultProps = {
  ellipsis: '...',
  edges: 2,
  limit: 10,
  perPage: 10,
  currentPage: 1,
  totalResults: 0,
  onChangePage: null
};
Pagination.propTypes = {
  totalResults: _react2['default'].PropTypes.number.isRequired,
  currentPage: _react2['default'].PropTypes.any,
  perPage: _react2['default'].PropTypes.any.isRequired,
  onChangePage: _react2['default'].PropTypes.func,
  actions: _react2['default'].PropTypes.shape({
    changePage: _react2['default'].PropTypes.func.isRequired,
    executeSearch: _react2['default'].PropTypes.func.isRequired
  })
};

var PageNumber = function (_React$Component2) {
  _inherits(PageNumber, _React$Component2);

  function PageNumber() {
    var _Object$getPrototypeO2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, PageNumber);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(PageNumber)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.handleClick = function () {
      var page = _this3.props.page;


      if (!isNaN(page)) _this3.props.selectPage(page);
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(PageNumber, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var page = _props2.page;
      var currentPage = _props2.currentPage;

      var klass = (0, _classnames2['default'])({
        'ola-page': true,
        'ola-page-current': currentPage === page,
        'ola-page-ellipsis': isNaN(page)
      });
      return _react2['default'].createElement(
        'button',
        {
          className: klass,
          onClick: this.handleClick
        },
        page
      );
    }
  }]);

  return PageNumber;
}(_react2['default'].Component);

module.exports = Pagination;
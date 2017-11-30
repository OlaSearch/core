'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Pagination = function (_React$Component) {
  (0, _inherits3['default'])(Pagination, _React$Component);

  function Pagination() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Pagination);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Pagination.__proto__ || (0, _getPrototypeOf2['default'])(Pagination)).call.apply(_ref, [this].concat(args))), _this), _this.prevPage = function () {
      var currentPage = _this.props.currentPage;


      --currentPage;

      if (currentPage < 1) currentPage = 1;

      _this.selectPage(currentPage);
    }, _this.nextPage = function () {
      var _this$props = _this.props,
          currentPage = _this$props.currentPage,
          totalResults = _this$props.totalResults,
          perPage = _this$props.perPage;

      var totalPages = Math.ceil(totalResults / perPage);

      ++currentPage;

      if (currentPage > totalPages) currentPage = totalPages;

      _this.selectPage(currentPage);
    }, _this.selectPage = function (page) {
      var _this$props2 = _this.props,
          actions = _this$props2.actions,
          onChangePage = _this$props2.onChangePage;


      if (onChangePage) {
        return onChangePage(page);
      }

      _this.pagination.parentNode.scrollIntoView();

      actions.changePage(page);

      actions.executeSearch();
    }, _this.registerRef = function (input) {
      _this.pagination = input;
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Pagination, [{
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
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.totalResults !== nextProps.totalResults || this.props.currentPage !== nextProps.currentPage || this.props.perPage !== nextProps.perPage;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          totalResults = _props.totalResults,
          perPage = _props.perPage,
          currentPage = _props.currentPage,
          edges = _props.edges,
          limit = _props.limit,
          ellipsis = _props.ellipsis,
          translate = _props.translate;


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
        { className: 'ola-pagination', ref: this.registerRef },
        _react2['default'].createElement(
          'button',
          { className: prevPageClass, onClick: this.prevPage },
          translate('pagination_prev_label')
        ),
        pages.map(function (page, idx) {
          return _react2['default'].createElement(PageNumber, {
            selectPage: _this2.selectPage,
            page: page,
            key: idx,
            isActive: currentPageInt === page
          });
        }),
        _react2['default'].createElement(
          'button',
          { className: nextPageClass, onClick: this.nextPage },
          translate('pagination_next_label')
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
function PageNumber(_ref2) {
  var page = _ref2.page,
      isActive = _ref2.isActive,
      selectPage = _ref2.selectPage;

  function handleClick() {
    if (!isNaN(page)) selectPage(page);
  }

  var klass = (0, _classnames2['default'])({
    'ola-page': true,
    'ola-page-current': isActive,
    'ola-page-ellipsis': isNaN(page)
  });
  return _react2['default'].createElement(
    'button',
    { className: klass, onClick: handleClick },
    page
  );
}

module.exports = (0, _OlaTranslate2['default'])(Pagination);
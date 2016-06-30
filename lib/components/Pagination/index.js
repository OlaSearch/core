'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_olaTranslate);

var Pagination = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(Pagination, _React$Component);

  function Pagination() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Pagination)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.prevPage = function () {
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


      onChangePage ? onChangePage() : _this.refs.pagination.parentNode.scrollIntoView();

      actions.changePage(page);

      actions.executeSearch();
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(Pagination, [{
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

      var _props = this.props;
      var totalResults = _props.totalResults;
      var perPage = _props.perPage;
      var currentPage = _props.currentPage;
      var edges = _props.edges;
      var limit = _props.limit;
      var ellipsis = _props.ellipsis;
      var translate = _props.translate;


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
          translate('pagination_prev_label')
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

var PageNumber = function (_React$Component2) {
  require('../../../.babelhelper.js').inherits(PageNumber, _React$Component2);

  function PageNumber() {
    var _Object$getPrototypeO2;

    var _temp2, _this3, _ret2;

    require('../../../.babelhelper.js').classCallCheck(this, PageNumber);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(PageNumber)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.handleClick = function () {
      var page = _this3.props.page;


      if (!isNaN(page)) _this3.props.selectPage(page);
    }, _temp2), require('../../../.babelhelper.js').possibleConstructorReturn(_this3, _ret2);
  }

  require('../../../.babelhelper.js').createClass(PageNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.page !== nextProps.page || this.props.currentPage !== nextProps.currentPage;
    }
  }, {
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

module.exports = (0, _olaTranslate2['default'])(Pagination);
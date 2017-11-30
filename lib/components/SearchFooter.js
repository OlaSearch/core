'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _LoadMore = require('./InfiniteScroll/LoadMore');

var _LoadMore2 = _interopRequireDefault(_LoadMore);

var _Search = require('./../actions/Search');

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function SearchFooter(props, context) {
  var infiniteScroll = context.config.infiniteScroll;
  var isPhone = props.isPhone,
      dispatch = props.dispatch,
      totalResults = props.totalResults,
      infiniteScrollOverride = props.infiniteScroll,
      beforeChangePage = props.beforeChangePage;


  if (!totalResults) {
    return null;
  }

  var boundActionCreators = (0, _redux.bindActionCreators)({ changePage: _Search.changePage, executeSearch: _Search.executeSearch, loadMore: _Search.loadMore }, dispatch);

  if (infiniteScrollOverride || infiniteScroll || isPhone) {
    return _react2['default'].createElement(_LoadMore2['default'], (0, _extends3['default'])({}, props, { actions: boundActionCreators, beforeChangePage: beforeChangePage }));
  }

  return _react2['default'].createElement(_Pagination2['default'], (0, _extends3['default'])({}, props, { actions: boundActionCreators, beforeChangePage: beforeChangePage }));
}

SearchFooter.contextTypes = {
  config: _propTypes2['default'].object
};

module.exports = SearchFooter;
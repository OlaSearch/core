'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var SearchFooter = function SearchFooter(props, context) {
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
    return _react2['default'].createElement(_LoadMore2['default'], _extends({}, props, { actions: boundActionCreators, beforeChangePage: beforeChangePage }));
  }

  return _react2['default'].createElement(_Pagination2['default'], _extends({}, props, { actions: boundActionCreators, beforeChangePage: beforeChangePage }));
};

SearchFooter.contextTypes = {
  config: _propTypes2['default'].object
};

module.exports = SearchFooter;
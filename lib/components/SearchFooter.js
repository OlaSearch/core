'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _Pagination = require('./Pagination');

var _Pagination2 = require('../../.babelhelper.js').interopRequireDefault(_Pagination);

var _LoadMore = require('./InfiniteScroll/LoadMore');

var _LoadMore2 = require('../../.babelhelper.js').interopRequireDefault(_LoadMore);

var _Search = require('./../actions/Search');

var _redux = require('redux');

var SearchFooter = function SearchFooter(props, context) {
  var infiniteScroll = context.config.infiniteScroll;
  var isPhone = props.isPhone;
  var dispatch = props.dispatch;

  var boundActionCreators = (0, _redux.bindActionCreators)({ changePage: _Search.changePage, executeSearch: _Search.executeSearch, loadMore: _Search.loadMore }, dispatch);

  if (infiniteScroll || isPhone) {
    return _react2['default'].createElement(_LoadMore2['default'], require('../../.babelhelper.js')['extends']({}, props, { actions: boundActionCreators }));
  }

  return _react2['default'].createElement(_Pagination2['default'], require('../../.babelhelper.js')['extends']({}, props, { actions: boundActionCreators }));
};

SearchFooter.contextTypes = {
  config: _react2['default'].PropTypes.object
};

module.exports = SearchFooter;
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _LoadMore = require('./InfiniteScroll/LoadMore');

var _LoadMore2 = _interopRequireDefault(_LoadMore);

var _Search = require('./../actions/Search');

var SearchActionCreators = _interopRequireWildcard(_Search);

var _redux = require('redux');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SearchFooter = function SearchFooter(props, context) {
	var infiniteScroll = context.config.infiniteScroll;
	var isPhone = props.isPhone;
	var dispatch = props.dispatch;


	var boundActionCreators = (0, _redux.bindActionCreators)(SearchActionCreators, dispatch);

	if (infiniteScroll || isPhone) {

		return _react2.default.createElement(_LoadMore2.default, _extends({}, props, { actions: boundActionCreators }));
	}

	return _react2.default.createElement(_Pagination2.default, _extends({}, props, { actions: boundActionCreators }));
};

SearchFooter.contextTypes = {
	config: _react2.default.PropTypes.object
};

module.exports = SearchFooter;
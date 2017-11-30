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

var _Bookmarks = require('./../../actions/Bookmarks');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Logger = require('./../../actions/Logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var BookmarkActions = function (_React$Component) {
  (0, _inherits3['default'])(BookmarkActions, _React$Component);

  function BookmarkActions() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, BookmarkActions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = BookmarkActions.__proto__ || (0, _getPrototypeOf2['default'])(BookmarkActions)).call.apply(_ref, [this].concat(args))), _this), _this.addBookmark = function () {
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          result = _this$props.result;

      dispatch((0, _Bookmarks.addBookmark)(result));
      dispatch((0, _Logger.log)({
        eventType: 'C',
        eventCategory: 'Add bookmark',
        eventAction: 'click',
        debounce: true,
        result: result,
        snippetId: _this.props.snippetId
      }));
    }, _this.removeBookmark = function () {
      var _this$props2 = _this.props,
          dispatch = _this$props2.dispatch,
          result = _this$props2.result;

      dispatch((0, _Bookmarks.removeBookmark)(result));
      dispatch((0, _Logger.log)({
        eventType: 'C',
        eventCategory: 'Remove bookmark',
        eventAction: 'click',
        debounce: true,
        result: result,
        snippetId: _this.props.snippetId
      }));
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(BookmarkActions, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.bookmarks !== nextProps.bookmarks || this.props.result.id !== nextProps.result.id;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          bookmarks = _props.bookmarks,
          result = _props.result,
          translate = _props.translate,
          isBookmark = _props.isBookmark;

      var isBookmarked = bookmarks.filter(function (bookmark) {
        return bookmark.id === result.id;
      }).length;
      var removeLabel = translate('remove_bookmark_label');
      var addLabel = translate('add_bookmark_label');
      var removeClassName = (0, _classnames2['default'])({
        'ola-link-bookmark-action action-remove': !isBookmark,
        'ola-module-clear ola-module-bookmark-remove': isBookmark
      });
      if (isBookmarked || isBookmark) {
        return _react2['default'].createElement(
          'button',
          {
            type: 'button',
            className: removeClassName,
            title: removeLabel,
            onClick: this.removeBookmark
          },
          _react2['default'].createElement(
            'span',
            null,
            removeLabel
          )
        );
      } else {
        return _react2['default'].createElement(
          'button',
          {
            type: 'button',
            className: 'ola-link-bookmark-action',
            title: addLabel,
            onClick: this.addBookmark
          },
          _react2['default'].createElement(
            'span',
            null,
            addLabel
          )
        );
      }
    }
  }]);
  return BookmarkActions;
}(_react2['default'].Component);

module.exports = (0, _OlaTranslate2['default'])(BookmarkActions);
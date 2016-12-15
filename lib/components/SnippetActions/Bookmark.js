'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Bookmarks = require('./../../actions/Bookmarks');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _Logger = require('./../../actions/Logger');

var BookmarkActions = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(BookmarkActions, _React$Component);

  function BookmarkActions() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, BookmarkActions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BookmarkActions)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.addBookmark = function () {
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var result = _this$props.result;

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
      var _this$props2 = _this.props;
      var dispatch = _this$props2.dispatch;
      var result = _this$props2.result;

      dispatch((0, _Bookmarks.removeBookmark)(result));
      dispatch((0, _Logger.log)({
        eventType: 'C',
        eventCategory: 'Remove bookmark',
        eventAction: 'click',
        debounce: true,
        result: result,
        snippetId: _this.props.snippetId
      }));
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(BookmarkActions, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.bookmarks !== nextProps.bookmarks || this.props.result.id !== nextProps.result.id;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var bookmarks = _props.bookmarks;
      var result = _props.result;
      var translate = _props.translate;
      var isBookmark = _props.isBookmark;

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
            onClick: this.removeBookmark },
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
            onClick: this.addBookmark },
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
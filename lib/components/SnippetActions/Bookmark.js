'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var BookmarkActions = function (_React$Component) {
  _inherits(BookmarkActions, _React$Component);

  function BookmarkActions() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BookmarkActions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BookmarkActions.__proto__ || Object.getPrototypeOf(BookmarkActions)).call.apply(_ref, [this].concat(args))), _this), _this.addBookmark = function () {
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BookmarkActions, [{
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
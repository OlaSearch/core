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

var _reactRedux = require('react-redux');

var _Bookmarks = require('./../../actions/Bookmarks');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SearchResults = require('./../SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _Logger = require('./../../actions/Logger');

var _NoBookmarks = require('./NoBookmarks');

var _NoBookmarks2 = _interopRequireDefault(_NoBookmarks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Bookmarks = function (_React$Component) {
  (0, _inherits3['default'])(Bookmarks, _React$Component);

  function Bookmarks(props) {
    (0, _classCallCheck3['default'])(this, Bookmarks);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Bookmarks.__proto__ || (0, _getPrototypeOf2['default'])(Bookmarks)).call(this, props));

    _this.handleClickOutside = function (event) {
      _this.setState({
        isOpen: false
      });
    };

    _this.toggleVisibility = function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      }, function () {
        if (_this.state.isOpen) {
          _this.props.onOpen && _this.props.onOpen();

          _this.props.dispatch((0, _Logger.log)({
            eventType: 'C',
            eventCategory: 'Bookmark button',
            eventAction: 'open',
            eventLabel: 'Bookmarks',
            debounce: true
          }));
        }
      });
    };

    _this.onRemove = function (bookmark) {
      _this.props.dispatch((0, _Bookmarks.removeBookmark)(bookmark));
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  (0, _createClass3['default'])(Bookmarks, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.bookmarks !== nextProps.bookmarks || this.state.isOpen !== nextState.isOpen;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          bookmarks = _props.bookmarks,
          dispatch = _props.dispatch,
          translate = _props.translate;
      var isOpen = this.state.isOpen;


      var klass = (0, _classnames2['default'])({
        'ola-module': true,
        'ola-js-hide': !isOpen
      });
      return _react2['default'].createElement(
        'div',
        { className: 'ola-bookmarks-container' },
        _react2['default'].createElement(
          'button',
          {
            type: 'button',
            className: 'ola-link-bookmark',
            onClick: this.toggleVisibility
          },
          _react2['default'].createElement('span', { className: 'ola-btn-hint hint--top', 'aria-label': translate('bookmarks_label') })
        ),
        _react2['default'].createElement(
          'div',
          { className: klass },
          _react2['default'].createElement(
            'div',
            { className: 'ola-module-title' },
            translate('bookmarks_label')
          ),
          _react2['default'].createElement(
            'div',
            { className: 'ola-module-body' },
            _react2['default'].createElement(_NoBookmarks2['default'], {
              bookmarks: bookmarks
            }),
            _react2['default'].createElement(_SearchResults2['default'], {
              bookmarks: bookmarks,
              results: bookmarks,
              dispatch: dispatch,
              isBookmark: true
            })
          )
        )
      );
    }
  }]);
  return Bookmarks;
}(_react2['default'].Component);

function mapStateToProps(state) {
  return {
    bookmarks: state.AppState.bookmarks
  };
}

var BookmarksContainer = (0, _reactRedux.connect)(mapStateToProps)((0, _OlaTranslate2['default'])((0, _reactOnclickoutside2['default'])(Bookmarks)));
var BookMarksWrapper = function BookMarksWrapper(props, _ref) {
  var bookmarking = _ref.config.bookmarking;

  if (bookmarking) return _react2['default'].createElement(BookmarksContainer, props);
  return null;
};
BookMarksWrapper.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};

module.exports = BookMarksWrapper;
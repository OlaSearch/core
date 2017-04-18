'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _NoResults = require('./../Snippets/NoResults');

var _NoResults2 = _interopRequireDefault(_NoResults);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _Logger = require('./../../actions/Logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Bookmarks = function (_React$Component) {
  _inherits(Bookmarks, _React$Component);

  function Bookmarks(props) {
    _classCallCheck(this, Bookmarks);

    var _this = _possibleConstructorReturn(this, (Bookmarks.__proto__ || Object.getPrototypeOf(Bookmarks)).call(this, props));

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

  _createClass(Bookmarks, [{
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
            _react2['default'].createElement(_NoResults2['default'], {
              results: bookmarks,
              isBookmark: true
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

var _ref2 = _react2['default'].createElement(BookmarksContainer, null);

var BookMarksWrapper = function BookMarksWrapper(props, _ref) {
  var bookmarking = _ref.config.bookmarking;

  if (bookmarking) return _ref2;
  return null;
};
BookMarksWrapper.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};

module.exports = BookMarksWrapper;
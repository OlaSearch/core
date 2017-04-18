'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _History = require('./../../actions/History');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _HistoryItem = require('./HistoryItem');

var _HistoryItem2 = _interopRequireDefault(_HistoryItem);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _Logger = require('./../../actions/Logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var History = function (_React$Component) {
  _inherits(History, _React$Component);

  function History(props) {
    _classCallCheck(this, History);

    var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this, props));

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
            eventCategory: 'History button',
            eventAction: 'open',
            eventLabel: 'History',
            debounce: true
          }));
        }
      });
    };

    _this.clearHistory = function () {
      _this.props.dispatch((0, _History.clearHistory)());
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  _createClass(History, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isOpen !== this.props.isOpen) {
        this.setState({
          isOpen: nextProps.isOpen
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.history !== this.props.history || nextState.isOpen !== this.state.isOpen;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          history = _props.history,
          translate = _props.translate,
          searchPageUrl = _props.searchPageUrl;
      var isOpen = this.state.isOpen;


      var klass = (0, _classnames2['default'])({
        'ola-module': true,
        'ola-js-hide': !isOpen
      });

      var hasHistory = history.length > 0;

      return _react2['default'].createElement(
        'div',
        { className: 'ola-history-container' },
        _react2['default'].createElement(
          'button',
          {
            type: 'button',
            className: 'ola-link-history',
            onClick: this.toggleVisibility
          },
          _react2['default'].createElement('span', { className: 'ola-btn-hint hint--top', 'aria-label': translate('history_label') })
        ),
        _react2['default'].createElement(
          'div',
          { className: klass },
          _react2['default'].createElement(
            'div',
            { className: 'ola-module-title' },
            _react2['default'].createElement(
              'span',
              null,
              translate('history_label'),
              ' '
            ),
            hasHistory ? _react2['default'].createElement(
              'button',
              {
                type: 'button',
                className: 'ola-fake-button ola-clear',
                onClick: this.clearHistory
              },
              '(clear)'
            ) : null
          ),
          _react2['default'].createElement(
            'div',
            { className: 'ola-module-body' },
            !hasHistory && _react2['default'].createElement(
              'div',
              { className: 'ola-module-item' },
              translate('history_empty_label')
            ),
            history.map(function (item, idx) {
              return _react2['default'].createElement(_HistoryItem2['default'], { searchPageUrl: searchPageUrl, history: item, key: idx });
            })
          )
        )
      );
    }
  }]);

  return History;
}(_react2['default'].Component);

function mapStateToProps(state) {
  return {
    history: state.AppState.history
  };
}

var HistoryContainer = (0, _reactRedux.connect)(mapStateToProps)((0, _OlaTranslate2['default'])((0, _reactOnclickoutside2['default'])(History)));
var HistoryWrapper = function HistoryWrapper(props, _ref) {
  var _ref$config = _ref.config,
      searchHistory = _ref$config.searchHistory,
      searchPageUrl = _ref$config.searchPageUrl;

  if (searchHistory) return _react2['default'].createElement(HistoryContainer, { searchPageUrl: searchPageUrl });
  return null;
};
HistoryWrapper.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};

module.exports = HistoryWrapper;
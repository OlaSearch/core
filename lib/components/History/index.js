'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _History = require('./../../actions/History');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _HistoryItem = require('./HistoryItem');

var _HistoryItem2 = _interopRequireDefault(_HistoryItem);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2['default'].createElement('span', { className: 'ola-btn-hint hint--top', 'aria-label': 'Search history' });

var _ref2 = _react2['default'].createElement(
  'span',
  null,
  'History '
);

var History = function (_React$Component) {
  _inherits(History, _React$Component);

  function History(props) {
    _classCallCheck(this, History);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(History).call(this, props));

    _this.handleClickOutside = function (event) {
      _this.setState({
        isOpen: false
      });
    };

    _this.toggleVisibility = function () {
      _this.setState({
        isOpen: !_this.state.isOpen
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
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.history !== this.props.history || nextState.isOpen !== this.state.isOpen;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var history = _props.history;
      var emptyHistoryText = _props.emptyHistoryText;
      var searchPageUrl = this.context.config.searchPageUrl;
      var isOpen = this.state.isOpen;


      var klass = (0, _classnames2['default'])({
        'ola-module': true,
        'ola-js-hide': !isOpen
      });

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
          _ref
        ),
        _react2['default'].createElement(
          'div',
          { className: klass },
          _react2['default'].createElement(
            'div',
            { className: 'ola-module-title' },
            _ref2,
            _react2['default'].createElement(
              'button',
              {
                type: 'button',
                className: 'ola-fake-button ola-clear',
                onClick: this.clearHistory },
              '(clear)'
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'ola-module-body' },
            !history.length && _react2['default'].createElement(
              'div',
              { className: 'ola-module-item' },
              emptyHistoryText
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

History.defaultProps = {
  emptyHistoryText: 'Your search history will show here'
};
History.contextTypes = {
  config: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, _react2['default'].PropTypes.func])
};


function mapStateToProps(state) {
  return {
    history: state.AppState.history
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)((0, _reactOnclickoutside2['default'])(History));
'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var History = function (_React$Component) {
  (0, _inherits3['default'])(History, _React$Component);

  function History(props) {
    (0, _classCallCheck3['default'])(this, History);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

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

  History.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen
      });
    }
  };

  History.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextProps.history !== this.props.history || nextState.isOpen !== this.state.isOpen;
  };

  History.prototype.render = function render() {
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

    /* Sort history based on popularity */
    history = history.sort(_utilities.sortHistory);

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
        _react2['default'].createElement('span', {
          className: 'ola-btn-hint hint--top',
          'aria-label': translate('history_label')
        })
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
            return _react2['default'].createElement(_HistoryItem2['default'], {
              searchPageUrl: searchPageUrl,
              history: item,
              key: idx
            });
          })
        )
      )
    );
  };

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

  if (searchHistory) {
    return _react2['default'].createElement(HistoryContainer, (0, _extends3['default'])({ searchPageUrl: searchPageUrl }, props));
  }
  return null;
};
HistoryWrapper.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};

module.exports = HistoryWrapper;
'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _History = require('./../../actions/History');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = require('../../../.babelhelper.js').interopRequireDefault(_reactOnclickoutside);

var _HistoryItem = require('./HistoryItem');

var _HistoryItem2 = require('../../../.babelhelper.js').interopRequireDefault(_HistoryItem);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_olaTranslate);

var _Logger = require('./../../actions/Logger');

var History = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(History, _React$Component);

  function History(props) {
    require('../../../.babelhelper.js').classCallCheck(this, History);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(History).call(this, props));

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

  require('../../../.babelhelper.js').createClass(History, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.history !== this.props.history || nextState.isOpen !== this.state.isOpen;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var history = _props.history;
      var translate = _props.translate;
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

module.exports = (0, _reactRedux.connect)(mapStateToProps)((0, _olaTranslate2['default'])((0, _reactOnclickoutside2['default'])(History)));
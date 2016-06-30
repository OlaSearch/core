'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _OlaIntlProvider = require('./OlaIntlProvider');

var _OlaIntlProvider2 = require('../../.babelhelper.js').interopRequireDefault(_OlaIntlProvider);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var OlaProvider = function (_React$Component) {
  require('../../.babelhelper.js').inherits(OlaProvider, _React$Component);

  function OlaProvider(props) {
    require('../../.babelhelper.js').classCallCheck(this, OlaProvider);

    var _this = require('../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(OlaProvider).call(this, props));

    var config = props.config;
    var store = props.store;
    var namespace = config.namespace;

    if (!config || !store) {
      var namePart = _this.constructor.displayName ? ' of ' + _this.constructor.displayName : '';
      throw new Error('Could not find config or store on this.props ' + namePart);
    }
    /**
     * Rehydrate store from storage if namespace is present
     * @param  {[type]} namespace
     */
    if (namespace) {
      store.dispatch({
        type: _ActionTypes2['default'].OLA_REHYDRATE,
        namespace: namespace
      });
    }
    return _this;
  }

  require('../../.babelhelper.js').createClass(OlaProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        config: this.props.config
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'ola-search' },
        _react2['default'].createElement(
          _reactRedux.Provider,
          { store: this.props.store },
          _react2['default'].createElement(
            _OlaIntlProvider2['default'],
            { translations: this.props.translations },
            this.props.children
          )
        )
      );
    }
  }]);

  return OlaProvider;
}(_react2['default'].Component);

OlaProvider.childContextTypes = {
  config: _react2['default'].PropTypes.any.isRequired
};


module.exports = OlaProvider;
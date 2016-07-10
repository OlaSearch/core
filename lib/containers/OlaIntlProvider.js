'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _translations = require('./../translations');

var _translations2 = require('../../.babelhelper.js').interopRequireDefault(_translations);

var _utilities = require('./../utilities');

var OlaIntlProvider = function (_React$Component) {
  require('../../.babelhelper.js').inherits(OlaIntlProvider, _React$Component);

  function OlaIntlProvider(props) {
    require('../../.babelhelper.js').classCallCheck(this, OlaIntlProvider);

    var _this = require('../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(OlaIntlProvider).call(this, props));

    _this.translate = function (key, placeholders, isHTML) {
      var result = (0, _utilities.translateKey)(key, _this.messages);
      if (typeof placeholders === 'undefined') {
        return result;
      }
      var finalResult = (0, _utilities.supplant)(result, placeholders);
      return isHTML ? _react2['default'].createElement('div', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(finalResult) }) : finalResult;
    };

    var locale = props.locale;
    var _props$translations = props.translations;
    var t = _props$translations === undefined ? {} : _props$translations;

    _this.messages = require('../../.babelhelper.js')['extends']({}, _translations2['default'][locale] ? _translations2['default'][locale]['messages'] : {}, t[locale] ? t[locale]['messages'] : {});
    return _this;
  }

  require('../../.babelhelper.js').createClass(OlaIntlProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        translate: this.translate
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return OlaIntlProvider;
}(_react2['default'].Component);

OlaIntlProvider.childContextTypes = {
  translate: _react2['default'].PropTypes.func
};


function mapPropsToState(state) {
  var Intl = state.Intl;

  return require('../../.babelhelper.js')['extends']({}, Intl, {
    key: Intl.locale
  });
}

module.exports = (0, _reactRedux.connect)(mapPropsToState)(OlaIntlProvider);
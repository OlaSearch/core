'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaLogger);

var Button = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(Button, _React$Component);

  function Button() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Button)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handeClick = function (event) {
      _this.props.log({
        eventType: 'C',
        result: _this.props.result,
        eventCategory: _this.props.label,
        eventAction: 'click',
        snippetId: _this.props.snippetId
      });

      if (_this.props.onClick) return _this.props.onClick(event, _this.props.result);

      event.preventDefault();
      window.location.href = _this.props.url;
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(Button, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var label = _props.label;
      var className = _props.className;
      var fullWidth = _props.fullWidth;

      if (!label) return null;
      var klass = (0, _classnames2['default'])('ola-cta-button', className, {
        'ola-btn-fullwidth': fullWidth
      });
      return _react2['default'].createElement(
        'a',
        {
          className: klass,
          onClick: this.handeClick,
          href: this.props.url
        },
        label
      );
    }
  }]);

  return Button;
}(_react2['default'].Component);

Button.defaultProps = {
  fullWidth: false
};


module.exports = (0, _OlaLogger2['default'])(Button);
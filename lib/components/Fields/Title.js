'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _Logger = require('./../../actions/Logger');

var Title = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(Title, _React$Component);

  function Title() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, Title);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Title)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.logClick = function (event) {
      var _this$props = _this.props;
      var onClick = _this$props.onClick;
      var result = _this$props.result;


      if (onClick) onClick(event);

      _this.context.store.dispatch((0, _Logger.log)('C', result));
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(Title, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var result = _props.result;
      var isLink = _props.isLink;
      var children = _props.children;
      var baseUrl = _props.baseUrl;
      var url = _props.url;

      var rest = require('../../../.babelhelper.js').objectWithoutProperties(_props, ['result', 'isLink', 'children', 'baseUrl', 'url']);

      var _props$iconLeft = _props.iconLeft;
      var iconLeft = _props$iconLeft === undefined ? null : _props$iconLeft;
      var _props$iconRight = _props.iconRight;
      var iconRight = _props$iconRight === undefined ? null : _props$iconRight;
      var title = result.title;
      var highlighting = result.highlighting;


      if (!url) url = result.url;
      if (baseUrl) url = baseUrl + url;

      /* Check for highlighting */

      if (highlighting) {
        var highlightedTitle = highlighting.title;

        if ((typeof highlightedTitle === 'undefined' ? 'undefined' : require('../../../.babelhelper.js')['typeof'](highlightedTitle)) === 'object') title = highlightedTitle[0];
      }

      return _react2['default'].createElement(
        'h3',
        require('../../../.babelhelper.js')['extends']({ className: 'ola-field ola-field-title' }, rest),
        iconLeft,
        isLink ? _react2['default'].createElement('a', { href: url, onClick: this.logClick, dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(title) }) : _react2['default'].createElement('span', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(title) }),
        children,
        iconRight
      );
    }
  }]);

  return Title;
}(_react2['default'].Component);

Title.defaultProps = {
  isLink: true
};

Title.contextTypes = {
  store: _react2['default'].PropTypes.object
};

module.exports = Title;
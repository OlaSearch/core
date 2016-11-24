'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaLogger);

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
      var isBookmark = _this$props.isBookmark;
      var isAutosuggest = _this$props.isAutosuggest;

      /* Send Log */

      var eventLabel = isBookmark ? 'Bookmarks' : isAutosuggest ? 'autosuggest' : null;
      _this.props.log({
        eventType: 'C',
        result: result,
        eventCategory: 'Title',
        eventAction: 'click',
        eventLabel: eventLabel,
        snippetId: _this.props.snippetId
      });

      if (onClick) onClick(event);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(Title, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var result = _props.result;
      var isLink = _props.isLink;
      var field = _props.field;
      var children = _props.children;
      var baseUrl = _props.baseUrl;
      var url = _props.url;
      var iconLeft = _props.iconLeft;
      var iconRight = _props.iconRight;
      var highlighting = result.highlighting;

      var title = result[field || 'title'];

      if (!url) url = result.url || this.props.url;
      if (baseUrl) url = baseUrl + url;

      /* Check for highlighting */

      if (highlighting) {
        var highlightedTitle = highlighting.title;

        if ((typeof highlightedTitle === 'undefined' ? 'undefined' : require('../../../.babelhelper.js')['typeof'](highlightedTitle)) === 'object') title = highlightedTitle[0];
      }

      return _react2['default'].createElement(
        'h3',
        { className: 'ola-field ola-field-title' },
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
  isLink: true,
  iconLeft: null,
  iconRight: null,
  isBookmark: false,
  field: null
};

module.exports = (0, _OlaLogger2['default'])(Title);
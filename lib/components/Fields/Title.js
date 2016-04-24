'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _Logger = require('./../../actions/Logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Title = function (_React$Component) {
  _inherits(Title, _React$Component);

  function Title() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Title);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Title)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.logClick = function (event) {
      var onClick = _this.props.onClick;


      if (onClick) onClick(event);

      _this.context.store.dispatch((0, _Logger.log)('C', _this.props.result));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Title, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var result = _props.result;
      var isLink = _props.isLink;
      var children = _props.children;
      var baseUrl = _props.baseUrl;
      var url = _props.url;
      var title = result.title;
      var highlighting = result.highlighting;


      if (!url) url = result.url;

      if (baseUrl) url = baseUrl + url;

      /* Check for highlighting */

      if (highlighting) {
        var highlighted_title = highlighting.title;


        if ((typeof highlighted_title === 'undefined' ? 'undefined' : _typeof(highlighted_title)) === 'object') title = highlighted_title[0];
      }

      return _react2['default'].createElement(
        'h3',
        { className: 'ola-field ola-field-title' },
        isLink ? _react2['default'].createElement('a', { href: url, onClick: this.logClick, dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(title) }) : _react2['default'].createElement('span', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(title) }),
        children
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
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var PopularKeywords = function PopularKeywords(_ref, context) {
  var label = _ref.label;
  var onClick = _ref.onClick;
  var popularKeywords = context.config.popularKeywords;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-popular-keywords' },
    _react2['default'].createElement(
      'span',
      { className: 'ola-popular-label' },
      label
    ),
    popularKeywords.map(function (keyword, idx) {
      return _react2['default'].createElement(PopularKeywordItem, {
        keyword: keyword,
        onClick: onClick,
        key: idx
      });
    })
  );
};

PopularKeywords.contextTypes = {
  config: _react2['default'].PropTypes.object
};

PopularKeywords.defaultProps = {
  label: 'Popular keywords: '
};

/**
 * Item
 */

var PopularKeywordItem = function (_React$Component) {
  _inherits(PopularKeywordItem, _React$Component);

  function PopularKeywordItem() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, PopularKeywordItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(PopularKeywordItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onClick = function () {
      _this.props.onClick(_this.props.keyword);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PopularKeywordItem, [{
    key: 'render',
    value: function render() {
      var keyword = this.props.keyword;

      return _react2['default'].createElement(
        'div',
        { className: 'ola-popular-keyword' },
        _react2['default'].createElement(
          'a',
          { onClick: this.onClick },
          keyword
        )
      );
    }
  }]);

  return PopularKeywordItem;
}(_react2['default'].Component);

module.exports = PopularKeywords;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = _interopRequireDefault(_olaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var ClearAllFacets = function (_React$Component) {
  _inherits(ClearAllFacets, _React$Component);

  function ClearAllFacets() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ClearAllFacets);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ClearAllFacets)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function () {
      var dispatch = _this.props.dispatch;


      dispatch((0, _Search.removeAllFacets)());
      dispatch((0, _Search.executeSearch)());
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ClearAllFacets, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.selected !== this.props.selected;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var selected = _props.selected;
      var translate = _props.translate;

      if (!selected.length) return null;

      return _react2['default'].createElement(
        'button',
        {
          type: 'button',
          className: 'ola-link-clear-all-filters',
          onClick: this.handleClick
        },
        translate('clear_all_filters')
      );
    }
  }]);

  return ClearAllFacets;
}(_react2['default'].Component);

module.exports = (0, _olaTranslate2['default'])(ClearAllFacets);
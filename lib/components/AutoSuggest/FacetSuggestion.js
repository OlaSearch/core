'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _propEq = require('ramda/src/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

var _AutoSuggest = require('./../../actions/AutoSuggest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var FacetSuggestion = function (_React$Component) {
  _inherits(FacetSuggestion, _React$Component);

  function FacetSuggestion() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, FacetSuggestion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FacetSuggestion)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onItemClick = function (facet, name) {
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var onSubmit = _this$props.onSubmit;


      dispatch((0, _AutoSuggest.addFacet)(facet, name));

      /* Prevent race condition */

      setTimeout(function () {
        return onSubmit && onSubmit();
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FacetSuggestion, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.facets !== this.props.facets;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var facets = _props.facets;
      var q = _props.q;
      var name = _props.name;
      var limit = _props.limit;

      var facet = (0, _find2['default'])((0, _propEq2['default'])('name', name))(facets);

      if (!facet) return null;

      var values = facet.values.splice(0, limit);

      return _react2['default'].createElement(
        'div',
        { className: 'ola-facet-suggestions' },
        values.map(function (value, idx) {
          return _react2['default'].createElement(FacetSuggestionItem, {
            key: idx,
            facet: facet,
            name: value.name,
            q: q,
            onItemClick: _this2.onItemClick
          });
        })
      );
    }
  }]);

  return FacetSuggestion;
}(_react2['default'].Component);

/**
 * Facet suggestion item
 */


FacetSuggestion.defaultProps = {
  limit: 3
};

var FacetSuggestionItem = function (_React$Component2) {
  _inherits(FacetSuggestionItem, _React$Component2);

  function FacetSuggestionItem() {
    var _Object$getPrototypeO2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, FacetSuggestionItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(FacetSuggestionItem)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.handleClick = function () {
      _this3.props.onItemClick(_this3.props.facet, _this3.props.name);
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(FacetSuggestionItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var q = _props2.q;
      var name = _props2.name;

      return _react2['default'].createElement(
        'a',
        {
          className: 'ola-facet-suggestion',
          tabIndex: 0,
          onClick: this.handleClick
        },
        _react2['default'].createElement(
          'strong',
          null,
          q
        ),
        ' in ',
        name
      );
    }
  }]);

  return FacetSuggestionItem;
}(_react2['default'].Component);

module.exports = FacetSuggestion;
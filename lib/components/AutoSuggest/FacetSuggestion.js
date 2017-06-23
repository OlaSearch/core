'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _propEq = require('ramda/src/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

var _AutoSuggest = require('./../../actions/AutoSuggest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FacetSuggestion = function (_React$Component) {
  (0, _inherits3['default'])(FacetSuggestion, _React$Component);

  function FacetSuggestion() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, FacetSuggestion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = FacetSuggestion.__proto__ || (0, _getPrototypeOf2['default'])(FacetSuggestion)).call.apply(_ref, [this].concat(args))), _this), _this.onItemClick = function (facet, name) {
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          onSubmit = _this$props.onSubmit;


      dispatch((0, _AutoSuggest.addFacet)(facet, name));

      /* Prevent race condition */
      setTimeout(function () {
        return onSubmit && onSubmit();
      });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(FacetSuggestion, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.facets !== this.props.facets;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          facets = _props.facets,
          q = _props.q,
          name = _props.name,
          limit = _props.limit;

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
exports['default'] = FacetSuggestion;

var FacetSuggestionItem = function (_React$Component2) {
  (0, _inherits3['default'])(FacetSuggestionItem, _React$Component2);

  function FacetSuggestionItem() {
    var _ref2;

    var _temp2, _this3, _ret2;

    (0, _classCallCheck3['default'])(this, FacetSuggestionItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = (0, _possibleConstructorReturn3['default'])(this, (_ref2 = FacetSuggestionItem.__proto__ || (0, _getPrototypeOf2['default'])(FacetSuggestionItem)).call.apply(_ref2, [this].concat(args))), _this3), _this3.handleClick = function () {
      _this3.props.onItemClick(_this3.props.facet, _this3.props.name);
    }, _temp2), (0, _possibleConstructorReturn3['default'])(_this3, _ret2);
  }

  (0, _createClass3['default'])(FacetSuggestionItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          q = _props2.q,
          name = _props2.name;

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
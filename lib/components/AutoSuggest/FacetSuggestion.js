'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _find = require('ramda/src/find');

var _find2 = require('../../../.babelhelper.js').interopRequireDefault(_find);

var _propEq = require('ramda/src/propEq');

var _propEq2 = require('../../../.babelhelper.js').interopRequireDefault(_propEq);

var _AutoSuggest = require('./../../actions/AutoSuggest');

var FacetSuggestion = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(FacetSuggestion, _React$Component);

  function FacetSuggestion() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, FacetSuggestion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FacetSuggestion)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onItemClick = function (facet, name) {
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var onSubmit = _this$props.onSubmit;


      dispatch((0, _AutoSuggest.addFacet)(facet, name));

      /* Prevent race condition */
      setTimeout(function () {
        return onSubmit && onSubmit();
      });
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(FacetSuggestion, [{
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
  require('../../../.babelhelper.js').inherits(FacetSuggestionItem, _React$Component2);

  function FacetSuggestionItem() {
    var _Object$getPrototypeO2;

    var _temp2, _this3, _ret2;

    require('../../../.babelhelper.js').classCallCheck(this, FacetSuggestionItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(FacetSuggestionItem)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.handleClick = function () {
      _this3.props.onItemClick(_this3.props.facet, _this3.props.name);
    }, _temp2), require('../../../.babelhelper.js').possibleConstructorReturn(_this3, _ret2);
  }

  require('../../../.babelhelper.js').createClass(FacetSuggestionItem, [{
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

exports['default'] = FacetSuggestion;
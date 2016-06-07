'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../actions/Search');

var _Tag = require('./Misc/Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _Tooltip = require('./Misc/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectedFilters = function (_React$Component) {
  _inherits(SelectedFilters, _React$Component);

  function SelectedFilters(props) {
    _classCallCheck(this, SelectedFilters);

    /* Parse queryString to get the referrer */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectedFilters).call(this, props));

    _this.handleRemoveFacet = function (facet, value) {
      var dispatch = _this.props.dispatch;

      dispatch((0, _Search.removeFacet)(facet, value));

      dispatch((0, _Search.executeSearch)());
    };

    _this.closeGuidePopover = function () {
      _this.setState({
        showGuidePopover: false
      });
    };

    _this.onRemoveQueryTag = function () {
      var dispatch = _this.props.dispatch;


      dispatch((0, _Search.clearQueryTerm)());
      dispatch((0, _Search.executeSearch)());
    };

    _this.handleRemoveFilter = function (filter) {
      var dispatch = _this.props.dispatch;

      dispatch((0, _Search.removeFilter)(filter));
      dispatch((0, _Search.executeSearch)());
    };

    var qString = _queryString2['default'].parse(window.location.search);

    _this.state = {
      showGuidePopover: !!qString.referrer
    };
    return _this;
  }

  _createClass(SelectedFilters, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var facets = _props.facets;
      var showQuery = _props.showQuery;
      var q = _props.q;
      var filters = _props.filters;
      var showGuidePopover = this.state.showGuidePopover;


      if (!facets && !facets.length && !q && !filters && !filters.length) return null;

      return _react2['default'].createElement(
        'div',
        { className: 'ola-facet-tags' },
        _react2['default'].createElement(_Tooltip2['default'], {
          isShown: showGuidePopover,
          onClose: this.closeGuidePopover
        }),
        showQuery && q ? _react2['default'].createElement(
          'div',
          { className: 'ola-facet-tag' },
          _react2['default'].createElement(
            'span',
            { className: 'ola-facet-tag-name' },
            q
          ),
          _react2['default'].createElement('button', { className: 'ola-facet-tag-remove', onClick: this.onRemoveQueryTag })
        ) : null,
        facets.map(function (facet, idx) {
          var tags = facet.selected;


          return _react2['default'].createElement(
            'div',
            { key: idx, className: 'ola-facet-tags-group' },
            _react2['default'].createElement(
              'span',
              { className: 'ola-facet-tags-heading' },
              facet.displayName,
              ': '
            ),
            tags.map(function (value, index) {
              return _react2['default'].createElement(SelectedItem, {
                name: value,
                facet: facet,
                handleRemove: _this2.handleRemoveFacet,
                key: index
              });
            })
          );
        }),
        filters.map(function (filter, idx) {
          var field = filter.field;


          return _react2['default'].createElement(SelectedFilterItem, {
            name: field,
            facet: filter,
            handleRemove: _this2.handleRemoveFilter,
            key: idx
          });
        })
      );
    }
  }]);

  return SelectedFilters;
}(_react2['default'].Component);

/**
 * Selected Tag
 */

SelectedFilters.defaultProps = {
  showQuery: false,
  filters: []
};

var SelectedItem = function (_React$Component2) {
  _inherits(SelectedItem, _React$Component2);

  function SelectedItem() {
    var _Object$getPrototypeO;

    var _temp, _this3, _ret;

    _classCallCheck(this, SelectedItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SelectedItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this3), _this3.handleRemove = function () {
      _this3.props.handleRemove(_this3.props.facet, _this3.props.name);
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(SelectedItem, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var name = _props2.name;
      var facet = _props2.facet;

      return _react2['default'].createElement(_Tag2['default'], {
        onRemove: this.handleRemove,
        name: name,
        facet: facet
      });
    }
  }]);

  return SelectedItem;
}(_react2['default'].Component);

/**
 * Selected Tag
 */

var SelectedFilterItem = function (_React$Component3) {
  _inherits(SelectedFilterItem, _React$Component3);

  function SelectedFilterItem() {
    var _Object$getPrototypeO2;

    var _temp2, _this4, _ret2;

    _classCallCheck(this, SelectedFilterItem);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(SelectedFilterItem)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this4), _this4.handleRemove = function () {
      _this4.props.handleRemove(_this4.props.facet);
    }, _temp2), _possibleConstructorReturn(_this4, _ret2);
  }

  _createClass(SelectedFilterItem, [{
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var name = _props3.name;
      var facet = _props3.facet;

      return _react2['default'].createElement(_Tag2['default'], {
        onRemove: this.handleRemove,
        name: name,
        facet: facet
      });
    }
  }]);

  return SelectedFilterItem;
}(_react2['default'].Component);

module.exports = SelectedFilters;
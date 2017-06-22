'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Search = require('./../../actions/Search');

var _OlaFacetToggle = require('./../../decorators/OlaFacetToggle');

var _OlaFacetToggle2 = _interopRequireDefault(_OlaFacetToggle);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var RatingFilter = function (_React$Component) {
  _inherits(RatingFilter, _React$Component);

  function RatingFilter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RatingFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RatingFilter.__proto__ || Object.getPrototypeOf(RatingFilter)).call.apply(_ref, [this].concat(args))), _this), _this.handleFacet = function (event) {
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          facet = _this$props.facet;

      var min = parseInt(event.target.value, 10);
      var value = [min, min + facet.interval];

      if (event.target.checked) {
        dispatch((0, _Search.addFacet)(facet, value));
      } else {
        dispatch((0, _Search.removeFacet)(facet, value));
      }

      /* Search */
      dispatch((0, _Search.executeSearch)());
    }, _this.isSelected = function (bounds, name) {
      /* Selected - [1,2,3,4] => [ [1, 2], [3, 4]]; */
      return bounds.indexOf(parseInt(name)) > -1;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RatingFilter, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          facet = _props.facet,
          isCollapsed = _props.isCollapsed,
          toggleDisplay = _props.toggleDisplay;
      var values = facet.values,
          interval = facet.interval;

      var klass = (0, _classnames2['default'])({
        'ola-facet': true,
        'ola-facet-collapsed': isCollapsed
      });

      /* Selected - [1,2,3,4] => [ [1, 2], [3, 4]]; */
      var selectedArray = (0, _utilities.parseRangeValues)(this.props.selected);
      var bounds = selectedArray.map(function (item) {
        return parseInt(item[0]);
      });

      return _react2['default'].createElement(
        'div',
        { className: klass },
        _react2['default'].createElement(
          'h4',
          { className: 'ola-facet-title', onClick: toggleDisplay },
          facet.displayName
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ola-facet-wrapper' },
          _react2['default'].createElement(
            'div',
            { className: 'ola-facet-list' },
            values.map(function (value, idx) {
              var stars = [];
              var normalized = Math.max(Math.ceil(parseInt(value.name) / interval), 0) + 1;
              var isActive = _this2.isSelected(bounds, value.name);
              var labelKlass = (0, _classnames2['default'])({
                'ola-checkbox ola-checkbox-label': true,
                'ola-checkbox-active': isActive
              });

              for (var i = 0; i < normalized; i++) {
                stars.push(_react2['default'].createElement('em', { key: i, className: 'ion ion-ios-star ola-rating-active' }));
              }

              return _react2['default'].createElement(
                'label',
                { key: idx, className: labelKlass },
                _react2['default'].createElement('input', {
                  type: 'checkbox',
                  value: value.name,
                  onChange: _this2.handleFacet,
                  checked: isActive
                }),
                stars,
                _react2['default'].createElement(
                  'span',
                  { className: 'ola-search-facet-count' },
                  value.count
                )
              );
            })
          )
        )
      );
    }
  }]);

  return RatingFilter;
}(_react2['default'].Component);

module.exports = (0, _OlaFacetToggle2['default'])(RatingFilter);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _AutoSuggest = require('./../../actions/AutoSuggest');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _flatten = require('ramda/src/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _propEq = require('ramda/src/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

/* Create a zone facet */
var createZoneFacet = function createZoneFacet(name) {
  return { name: name, zone: true, type: 'string' };
};

var _ref2 = _react2['default'].createElement(
  'label',
  { className: 'ola-zone-label' },
  'Select zone'
);

var Zone = function (_React$Component) {
  _inherits(Zone, _React$Component);

  function Zone() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Zone);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Zone.__proto__ || Object.getPrototypeOf(Zone)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (event) {
      var value = event.target.value;
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          replaceFacet = _this$props.replaceFacet,
          removeFacet = _this$props.removeFacet;

      var facet = createZoneFacet(_this.context.config.zone.filter);
      if (value) {
        replaceFacet(facet, value);
      } else {
        removeFacet(facet);
      }
      onChange && onChange(facet, value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Zone, [{
    key: 'render',
    value: function render() {
      var _context$config$zone = this.context.config.zone,
          defaultValue = _context$config$zone.defaultValue,
          values = _context$config$zone.values,
          filter = _context$config$zone.filter;
      var selected = this.props.selected;

      var selectedValues = (0, _flatten2['default'])(selected.filter(function (item) {
        return item.name === filter;
      }).map(function (item) {
        return item.selected;
      }));
      var selectedValue = selectedValues.length ? selectedValues[0] : defaultValue;
      var selectedDisplayName = (0, _find2['default'])((0, _propEq2['default'])('name', selectedValue))(values)['displayName'];

      return _react2['default'].createElement(
        'div',
        { className: 'ola-zone' },
        _ref2,
        _react2['default'].createElement(
          'span',
          { className: 'ola-zone-selected' },
          selectedDisplayName
        ),
        _react2['default'].createElement(
          'select',
          {
            onChange: this.onChange,
            value: selectedValue
          },
          values.map(function (zone) {
            var name = zone.name,
                displayName = zone.displayName;

            return _react2['default'].createElement(
              'option',
              { key: name, value: name },
              displayName
            );
          })
        )
      );
    }
  }]);

  return Zone;
}(_react2['default'].Component);

Zone.contextTypes = {
  config: _react2['default'].PropTypes.object
};
Zone.defaultProps = {
  selected: []
};


function mapStateToProps(state, ownProps) {
  return {
    selected: ownProps.isAutosuggest ? state.AutoSuggest.facet_query : state.QueryState.facet_query
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  var actions = void 0;
  if (ownProps.isAutosuggest) {
    actions = {
      replaceFacet: _AutoSuggest.addFacet,
      removeFacet: _AutoSuggest.removeFacet
    };
  } else {
    actions = {
      replaceFacet: _Search.replaceFacet,
      removeFacet: _Search.removeFacet
    };
  }
  return (0, _redux.bindActionCreators)(actions, dispatch);
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Zone);
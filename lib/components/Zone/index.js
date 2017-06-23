'use strict';

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
  (0, _inherits3['default'])(Zone, _React$Component);

  function Zone() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Zone);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Zone.__proto__ || (0, _getPrototypeOf2['default'])(Zone)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (event) {
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
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(Zone, [{
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
  config: _propTypes2['default'].object
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
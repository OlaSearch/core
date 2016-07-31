'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../../actions/Search');

var _AutoSuggest = require('./../../actions/AutoSuggest');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _flatten = require('ramda/src/flatten');

var _flatten2 = require('../../../.babelhelper.js').interopRequireDefault(_flatten);

var _find = require('ramda/src/find');

var _find2 = require('../../../.babelhelper.js').interopRequireDefault(_find);

var _propEq = require('ramda/src/propEq');

var _propEq2 = require('../../../.babelhelper.js').interopRequireDefault(_propEq);

/* Create a zone facet */
var createZoneFacet = function createZoneFacet(name) {
  return { name: name, zone: true, type: 'string' };
};

var _ref = _react2['default'].createElement(
  'label',
  { className: 'ola-zone-label' },
  'Select zone'
);

var Zone = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(Zone, _React$Component);

  function Zone() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, Zone);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Zone)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onChange = function (event) {
      var value = event.target.value;
      var _this$props = _this.props;
      var onChange = _this$props.onChange;
      var replaceFacet = _this$props.replaceFacet;
      var removeFacet = _this$props.removeFacet;

      var facet = createZoneFacet(_this.context.config.zone.filter);
      if (value) {
        replaceFacet(facet, value);
      } else {
        removeFacet(facet);
      }
      onChange && onChange(facet, value);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(Zone, [{
    key: 'render',
    value: function render() {
      var _context$config$zone = this.context.config.zone;
      var defaultValue = _context$config$zone.defaultValue;
      var values = _context$config$zone.values;
      var filter = _context$config$zone.filter;
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
        _ref,
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
            var name = zone.name;
            var displayName = zone.displayName;

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
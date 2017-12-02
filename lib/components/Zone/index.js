'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Search = require('./../../actions/Search');

var _AutoSuggest = require('./../../actions/AutoSuggest');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _flatten = require('rambda/lib/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _find = require('rambda/lib/find');

var _find2 = _interopRequireDefault(_find);

var _propEq = require('rambda/lib/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* Create a zone facet */
var createZoneFacet = function createZoneFacet(name) {
  return { name: name, zone: true, type: 'string' };
};

var _ref = _react2['default'].createElement(
  'label',
  { className: 'ola-zone-label' },
  'Select zone'
);

function Zone(props, context) {
  function onChange(event) {
    var value = event.target.value;
    var onChange = props.onChange,
        replaceFacet = props.replaceFacet,
        removeFacet = props.removeFacet;

    var facet = createZoneFacet(context.config.zone.filter);
    if (value) {
      replaceFacet(facet, value);
    } else {
      removeFacet(facet);
    }
    onChange && onChange(facet, value);
  }

  var _context$config$zone = context.config.zone,
      defaultValue = _context$config$zone.defaultValue,
      values = _context$config$zone.values,
      filter = _context$config$zone.filter;
  var selected = props.selected;

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
      { onChange: onChange, value: selectedValue },
      values.map(function (_ref2) {
        var name = _ref2.name,
            displayName = _ref2.displayName;

        return _react2['default'].createElement(
          'option',
          { key: name, value: name },
          displayName
        );
      })
    )
  );
}

Zone.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
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
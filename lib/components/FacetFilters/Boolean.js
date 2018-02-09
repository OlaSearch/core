'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Search = require('./../../actions/Search');

var _withToggle = require('./../../decorators/withToggle');

var _withToggle2 = _interopRequireDefault(_withToggle);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FacetTitle = require('./common/FacetTitle');

var _FacetTitle2 = _interopRequireDefault(_FacetTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function BooleanFilter(props) {
  function onChange(event) {
    var dispatch = props.dispatch,
        facet = props.facet;

    if (event.target.checked) {
      dispatch((0, _Search.replaceFacet)(facet, 'true'));
    } else dispatch((0, _Search.removeFacet)(facet, 'true'));

    dispatch((0, _Search.executeSearch)());
  }

  var facet = props.facet,
      selected = props.selected,
      toggleDisplay = props.toggleDisplay,
      isCollapsed = props.isCollapsed;


  if (!facet.values.length) return null;

  var displayName = facet.displayName,
      template = facet.template;


  var klass = (0, _classnames2['default'])({
    'ola-facet': true,
    'ola-facet-collapsed': isCollapsed
  });

  var isChecked = !!selected.length;

  return _react2['default'].createElement(
    'div',
    { className: klass },
    _react2['default'].createElement(_FacetTitle2['default'], {
      displayName: facet.displayName,
      toggleDisplay: toggleDisplay,
      isCollapsed: isCollapsed
    }),
    _react2['default'].createElement(
      'div',
      { className: 'ola-facet-wrapper' },
      _react2['default'].createElement(
        'label',
        { className: 'ola-checkbox ola-checkbox-label' },
        _react2['default'].createElement('input', { type: 'checkbox', checked: isChecked, onChange: onChange }),
        template
      )
    )
  );
}

exports['default'] = (0, _withToggle2['default'])(BooleanFilter);
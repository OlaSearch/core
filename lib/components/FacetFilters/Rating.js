'use strict';

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

var RatingFilter = function RatingFilter(props) {
  function handleFacet(event) {
    var dispatch = props.dispatch,
        facet = props.facet;

    var min = parseInt(event.target.value, 10);
    var value = [min, min + facet.interval];

    if (event.target.checked) {
      dispatch((0, _Search.addFacet)(facet, value));
    } else {
      dispatch((0, _Search.removeFacet)(facet, value));
    }

    /* Search */
    dispatch((0, _Search.executeSearch)());
  }

  function isSelected(bounds, name) {
    /* Selected - [1,2,3,4] => [ [1, 2], [3, 4]]; */
    return bounds.indexOf(parseInt(name)) > -1;
  }

  var facet = props.facet,
      isCollapsed = props.isCollapsed,
      toggleDisplay = props.toggleDisplay;
  var values = facet.values,
      interval = facet.interval;

  var klass = (0, _classnames2['default'])({
    'ola-facet': true,
    'ola-facet-collapsed': isCollapsed
  });

  /* Selected - [1,2,3,4] => [ [1, 2], [3, 4]]; */
  var selectedArray = (0, _utilities.parseRangeValues)(props.selected);
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
          var isActive = isSelected(bounds, value.name);
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
              onChange: handleFacet,
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
};

module.exports = (0, _OlaFacetToggle2['default'])(RatingFilter);
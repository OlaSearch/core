'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _propEq = require('ramda/src/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

var _AutoSuggest = require('./../../actions/AutoSuggest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FacetSuggestion = function FacetSuggestion(props) {
  function onItemClick(facet, name) {
    var dispatch = props.dispatch,
        onSubmit = props.onSubmit;


    dispatch((0, _AutoSuggest.addFacet)(facet, name));

    /* Prevent race condition */
    setTimeout(function () {
      return onSubmit && onSubmit();
    });
  }
  var facets = props.facets,
      q = props.q,
      name = props.name,
      limit = props.limit;

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
        onItemClick: onItemClick
      });
    })
  );
};

FacetSuggestion.defaultProps = {
  limit: 3

  /**
   * Facet suggestion item
   */
};var FacetSuggestionItem = function FacetSuggestionItem(_ref) {
  var facet = _ref.facet,
      name = _ref.name,
      q = _ref.q,
      onItemClick = _ref.onItemClick;

  function handleClick() {
    onItemClick(facet, name);
  }
  return _react2['default'].createElement(
    'a',
    { className: 'ola-facet-suggestion', tabIndex: 0, onClick: handleClick },
    _react2['default'].createElement(
      'strong',
      null,
      q
    ),
    ' in ',
    name
  );
};

exports['default'] = FacetSuggestion;
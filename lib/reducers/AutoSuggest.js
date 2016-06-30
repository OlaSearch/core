'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var initialState = {
  query: {
    q: '',
    per_page: 20,
    page: 1,
    facet_query: []
  },
  totalResults: 0,
  results: [],
  facets: [],
  spellSuggestions: [],
  suggestedTerm: '',
  isLoading: false,
  isOpen: false,
  qt: null
};

exports['default'] = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].UPDATE_QUERY_TERM_AUTOSUGGEST:
      return require('../../.babelhelper.js')['extends']({}, state, {
        query: require('../../.babelhelper.js')['extends']({}, state.query, {
          q: action.term
        })
      });

    case _ActionTypes2['default'].CLEAR_QUERY_TERM_AUTOSUGGEST:
      return initialState;

    case _ActionTypes2['default'].REQUEST_AUTOSUGGEST:
      return require('../../.babelhelper.js')['extends']({}, state, {
        isLoading: true
      });

    case _ActionTypes2['default'].REQUEST_AUTOSUGGEST_SUCCESS:
      var spellSuggestions = action.spellSuggestions;
      var results = action.results;
      var facets = action.facets;
      var totalResults = action.totalResults;
      var suggestedTerm = action.suggestedTerm;
      var qt = action.qt;


      return require('../../.babelhelper.js')['extends']({}, state, {
        results: results,
        facets: facets,
        spellSuggestions: spellSuggestions,
        totalResults: totalResults,
        isLoading: false,
        suggestedTerm: suggestedTerm,
        qt: qt,
        isOpen: !!results.length || !!spellSuggestions.length || !!suggestedTerm
      });

    case _ActionTypes2['default'].OPEN_AUTOSUGGEST:
      return require('../../.babelhelper.js')['extends']({}, state, {
        isOpen: true
      });

    case _ActionTypes2['default'].CLOSE_AUTOSUGGEST:
      return require('../../.babelhelper.js')['extends']({}, state, {
        isOpen: false
      });

    case _ActionTypes2['default'].ADD_FACET_AUTOSUGGEST:
      var value = action.value;
      var facet = action.facet;
      var name = facet.name;
      var displayName = facet.displayName;
      var type = facet.type;
      var multiSelect = facet.multiSelect;
      var template = facet.template;
      var label = facet.label;


      return require('../../.babelhelper.js')['extends']({}, state, {
        query: require('../../.babelhelper.js')['extends']({}, state.query, {
          facet_query: [{
            name: name, type: type, displayName: displayName, multiSelect: multiSelect, template: template, label: label,
            selected: [value]
          }]
        })
      });

    default:
      return state;
  }
};
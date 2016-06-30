'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _indexOf = require('ramda/src/indexOf');

var _indexOf2 = require('../../.babelhelper.js').interopRequireDefault(_indexOf);

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

/* Prevents redeclared variables for `JS Standard` compatiblity */
var fq, facet, value;

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
      facet = action.facet;
      value = action.value;
      var _facet = facet;
      var name = _facet.name;
      var displayName = _facet.displayName;
      var type = _facet.type;
      var multiSelect = _facet.multiSelect;
      var template = _facet.template;
      var label = _facet.label;


      return require('../../.babelhelper.js')['extends']({}, state, {
        query: require('../../.babelhelper.js')['extends']({}, state.query, {
          facet_query: [{
            name: name, type: type, displayName: displayName, multiSelect: multiSelect, template: template, label: label,
            selected: [value]
          }]
        })
      });

    case _ActionTypes2['default'].REMOVE_FACET_AUTOSUGGEST:
      fq = state.query.facet_query.slice(0);
      facet = action.facet;
      value = action.value;

      for (var i = fq.length - 1; i >= 0; i--) {
        var cur = fq[i];
        var selected = cur.selected;


        if (cur.name === facet.name) {
          /* Remove selections if No value is supplied */
          if (!value) selected = [];
          selected.splice((0, _indexOf2['default'])(value, selected), 1);
          if (!selected.length) fq = [].concat(require('../../.babelhelper.js').toConsumableArray(fq.slice(0, i)), require('../../.babelhelper.js').toConsumableArray(fq.slice(i + 1)));
        }
      }

      return require('../../.babelhelper.js')['extends']({}, state, {
        query: require('../../.babelhelper.js')['extends']({}, state.query, {
          facet_query: fq
        })
      });

    default:
      return state;
  }
};
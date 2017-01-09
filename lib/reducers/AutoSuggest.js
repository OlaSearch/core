'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _omit = require('ramda/src/omit');

var _omit2 = require('../../.babelhelper.js').interopRequireDefault(_omit);

var _Settings = require('./../constants/Settings');

var initialState = exports.initialState = {
  q: '',
  per_page: 20,
  page: 1,
  facet_query: [],
  totalResults: 0,
  results: [],
  facets: [],
  spellSuggestions: [],
  suggestedTerm: '',
  isLoading: false,
  isOpen: false,
  qt: null,
  searchInput: null
};

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].UPDATE_QUERY_TERM_AUTOSUGGEST:
      return require('../../.babelhelper.js')['extends']({}, state, {
        q: action.term,
        searchInput: action.searchInput || _Settings.SEARCH_INPUTS.KEYBOARD
      });

    case _ActionTypes2['default'].CLEAR_QUERY_TERM_AUTOSUGGEST:
      return require('../../.babelhelper.js')['extends']({}, state, (0, _omit2['default'])(['facet_query'], initialState));

    case _ActionTypes2['default'].REQUEST_AUTOSUGGEST:
      return require('../../.babelhelper.js')['extends']({}, state, {
        isLoading: true
      });

    case _ActionTypes2['default'].REQUEST_AUTOSUGGEST_SUCCESS:
      var spellSuggestions = action.spellSuggestions,
          results = action.results,
          facets = action.facets,
          totalResults = action.totalResults,
          suggestedTerm = action.suggestedTerm,
          qt = action.qt;


      var isOpen = (!!results.length || !!spellSuggestions.length || !!suggestedTerm) && !!state.q;

      return require('../../.babelhelper.js')['extends']({}, state, {
        results: results,
        facets: facets,
        spellSuggestions: spellSuggestions,
        totalResults: totalResults,
        isLoading: false,
        suggestedTerm: suggestedTerm,
        qt: qt,
        isOpen: isOpen
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
      var _action$facet = action.facet,
          name = _action$facet.name,
          displayName = _action$facet.displayName,
          type = _action$facet.type,
          multiSelect = _action$facet.multiSelect,
          template = _action$facet.template,
          label = _action$facet.label;

      return require('../../.babelhelper.js')['extends']({}, state, {
        facet_query: [{
          name: name,
          type: type,
          displayName: displayName,
          multiSelect: multiSelect,
          template: template,
          label: label,
          selected: [action.value]
        }]
      });

    case _ActionTypes2['default'].REMOVE_FACET_AUTOSUGGEST:
      return require('../../.babelhelper.js')['extends']({}, state, {
        facet_query: state.facet_query.filter(function (f) {
          return f.name !== action.facet.name;
        })
      });

    default:
      return state;
  }
};
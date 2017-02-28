'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _omit = require('ramda/src/omit');

var _omit2 = _interopRequireDefault(_omit);

var _Settings = require('./../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
      return _extends({}, state, {
        q: action.term,
        searchInput: action.searchInput || _Settings.SEARCH_INPUTS.KEYBOARD
      });

    case _ActionTypes2['default'].CLEAR_QUERY_TERM_AUTOSUGGEST:
      return _extends({}, state, (0, _omit2['default'])(['facet_query'], initialState));

    case _ActionTypes2['default'].REQUEST_AUTOSUGGEST:
      return _extends({}, state, {
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

      return _extends({}, state, {
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
      return _extends({}, state, {
        isOpen: true
      });

    case _ActionTypes2['default'].CLOSE_AUTOSUGGEST:
      return _extends({}, state, {
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

      return _extends({}, state, {
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
      return _extends({}, state, {
        facet_query: state.facet_query.filter(function (f) {
          return f.name !== action.facet.name;
        })
      });

    default:
      return state;
  }
};
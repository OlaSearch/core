'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _utilities = require('./../utilities');

var _Settings = require('./../constants/Settings');

var _equals = require('ramda/src/equals');

var _equals2 = _interopRequireDefault(_equals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = exports.initialState = {
  q: '',
  enriched_q: '', /* From Intent engine */
  page: 1,
  per_page: 10,
  facet_query: [],
  sort: '',
  filters: [],
  view: '',
  isSearchActive: true,
  searchInput: null,
  skip_intent: false,

  /* project info */
  projectId: null,
  env: null
};

/* Prevents redeclared variables for `JS Standard` compatiblity */
var exists;

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].ADD_FILTER:
      var filter = action.filter,
          selected = action.selected;

      exists = (0, _utilities.checkIfFacetExists)(state.filters, filter.name);
      if (exists) {
        return _extends({}, state, {
          filters: state.filters.map(function (item) {
            if (item.name === filter.name) {
              return _extends({}, item, {
                selected: selected
              });
            }
            return item;
          })
        });
      } else {
        return _extends({}, state, {
          filters: [].concat(_toConsumableArray(state.filters), [_extends({}, filter, { selected: selected })])
        });
      }

    case _ActionTypes2['default'].SET_SKIP_INTENT:
      return _extends({}, state, {
        skip_intent: action.flag
      });

    case _ActionTypes2['default'].REMOVE_FILTER:
      return _extends({}, state, {
        filters: state.filters.filter(function (item) {
          return item.name !== action.name;
        }),
        page: 1
      });

    case _ActionTypes2['default'].CLEAR_FILTERS:
      return _extends({}, state, {
        page: 1,
        filters: []
      });

    case _ActionTypes2['default'].UPDATE_STATE_FROM_QUERY:
      /* Reason: tennis players => click on snippet => come back to listing page from detail */
      return _extends({}, state, action.stateFromUrl, {
        referrer: '',
        searchInput: _Settings.SEARCH_INPUTS.URL,
        skip_intent: false
      });

    case _ActionTypes2['default'].UPDATE_QUERY_TERM:
      return _extends({}, state, {
        q: action.term,
        searchInput: action.searchInput || _Settings.SEARCH_INPUTS.KEYBOARD,
        enriched_q: '',
        page: 1,
        skip_intent: false
      });

    case _ActionTypes2['default'].CLEAR_ENRICHED_QUERY:
      return _extends({}, state, {
        enriched_q: ''
      });

    case _ActionTypes2['default'].CLEAR_QUERY_TERM:
      return _extends({}, state, {
        q: '',
        page: 1
      });

    case _ActionTypes2['default'].ADD_FACET:
      exists = (0, _utilities.checkIfFacetExists)(state.facet_query, action.facet.name);
      if (exists) {
        return _extends({}, state, {
          page: 1,
          facet_query: state.facet_query.map(function (item) {
            if (item.name === action.facet.name) {
              return _extends({}, item, {
                selected: [].concat(_toConsumableArray(item.selected), [action.value])
              });
            }
            return item;
          })
        });
      } else {
        return _extends({}, state, {
          page: 1,
          facet_query: [].concat(_toConsumableArray(state.facet_query), [_extends({}, action.facet, {
            selected: [action.value]
          })])
        });
      }

    case _ActionTypes2['default'].REMOVE_FACET:
      return _extends({}, state, {
        page: 1,
        facet_query: state.facet_query.map(function (item) {
          if (item.name === action.facet.name) {
            return _extends({}, item, {
              selected: item.selected.filter(function (val) {
                return !(0, _equals2['default'])(val, action.value);
              })
            });
          }
          return item;
        }).filter(function (item) {
          return item.selected.length;
        })
      });

    case _ActionTypes2['default'].REPLACE_FACET:
      exists = (0, _utilities.checkIfFacetExists)(state.facet_query, action.facet.name);
      if (exists) {
        return _extends({}, state, {
          page: 1,
          facet_query: state.facet_query.map(function (item) {
            if (item.name === action.facet.name) {
              return _extends({}, item, {
                selected: [action.value]
              });
            }
            return item;
          })
        });
      } else {
        return _extends({}, state, {
          page: 1,
          facet_query: [].concat(_toConsumableArray(state.facet_query), [_extends({}, action.facet, {
            selected: [action.value]
          })])
        });
      }

    case _ActionTypes2['default'].REMOVE_FACET_ITEM:
      return _extends({}, state, {
        page: 1,
        facet_query: state.facet_query.filter(function (item) {
          return item.name !== action.facet.name;
        })
      });

    case _ActionTypes2['default'].REMOVE_ALL_FACETS:
      return _extends({}, state, {
        facet_query: [],
        page: 1
      });

    case _ActionTypes2['default'].CHANGE_SORT:
      return _extends({}, state, {
        sort: action.sort || '',
        page: 1
      });

    case _ActionTypes2['default'].CHANGE_PAGE:
      return _extends({}, state, {
        page: action.page
      });

    case _ActionTypes2['default'].CHANGE_PER_PAGE:
      return _extends({}, state, {
        per_page: action.perPage
      });

    case _ActionTypes2['default'].CHANGE_VIEW:
      return _extends({}, state, {
        view: action.view
      });

    case _ActionTypes2['default'].SET_SEARCH_STATUS:
      return _extends({}, state, {
        isSearchActive: action.status
      });

    case _ActionTypes2['default'].REQUEST_SEARCH_SUCCESS:
      return _extends({}, state, {
        enriched_q: action.enriched_q || ''
      });

    case _ActionTypes2['default'].OLA_REHYDRATE:
      return _extends({}, state, {
        projectId: action.projectId,
        env: action.env
      });

    case _ActionTypes2['default'].UPDATE_OLA_PARAMETERS:
      return _extends({}, state, action.params);

    default:
      return state;
  }
};
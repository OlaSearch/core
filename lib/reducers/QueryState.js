'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _utilities = require('./../utilities');

var _Settings = require('./../constants/Settings');

var _equals = require('ramda/src/equals');

var _equals2 = _interopRequireDefault(_equals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var initialState = exports.initialState = {
  q: '',
  enriched_q: '' /* From Intent engine */
  , page: 1,
  per_page: 10,
  facet_query: [],
  sort: '',
  filters: [],
  view: '',
  isSearchActive: true,
  searchInput: null,
  skip_intent: false,
  debug: false,
  source: null,

  /* project info */
  projectId: null,
  env: null

  /* Prevents redeclared variables for `JS Standard` compatiblity */
};var exists;

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].ADD_FILTER:
      var filter = action.filter,
          selected = action.selected;

      exists = (0, _utilities.checkIfFacetExists)(state.filters, filter.name);
      if (exists) {
        return (0, _extends3['default'])({}, state, {
          filters: state.filters.map(function (item) {
            if (item.name === filter.name) {
              return (0, _extends3['default'])({}, item, {
                selected: selected
              });
            }
            return item;
          })
        });
      } else {
        return (0, _extends3['default'])({}, state, {
          filters: [].concat((0, _toConsumableArray3['default'])(state.filters), [(0, _extends3['default'])({}, filter, { selected: selected })])
        });
      }

    case _ActionTypes2['default'].SET_SKIP_INTENT:
      return (0, _extends3['default'])({}, state, {
        skip_intent: action.flag
      });

    case _ActionTypes2['default'].REMOVE_FILTER:
      return (0, _extends3['default'])({}, state, {
        filters: state.filters.filter(function (item) {
          return item.name !== action.name;
        }),
        page: 1
      });

    case _ActionTypes2['default'].CLEAR_FILTERS:
      return (0, _extends3['default'])({}, state, {
        page: 1,
        filters: []
      });

    case _ActionTypes2['default'].UPDATE_STATE_FROM_QUERY:
      /* Reason: tennis players => click on snippet => come back to listing page from detail */
      return (0, _extends3['default'])({}, state, action.stateFromUrl, {
        referrer: '',
        searchInput: _Settings.SEARCH_INPUTS.URL
      });

    case _ActionTypes2['default'].UPDATE_QUERY_TERM:
      return (0, _extends3['default'])({}, state, {
        q: action.term,
        searchInput: action.searchInput || _Settings.SEARCH_INPUTS.KEYBOARD,
        enriched_q: '',
        page: action.forcePageReset ? 1 : state.page,
        skip_intent: false
      });

    case _ActionTypes2['default'].CLEAR_ENRICHED_QUERY:
      return (0, _extends3['default'])({}, state, {
        enriched_q: ''
      });

    case _ActionTypes2['default'].CLEAR_QUERY_TERM:
      return (0, _extends3['default'])({}, state, {
        q: '',
        page: 1
      });

    case _ActionTypes2['default'].ADD_FACET:
      exists = (0, _utilities.checkIfFacetExists)(state.facet_query, action.facet.name);
      if (exists) {
        return (0, _extends3['default'])({}, state, {
          page: 1,
          facet_query: state.facet_query.map(function (item) {
            if (item.name === action.facet.name) {
              return (0, _extends3['default'])({}, item, {
                selected: [].concat((0, _toConsumableArray3['default'])(item.selected), [action.value])
              });
            }
            return item;
          })
        });
      } else {
        return (0, _extends3['default'])({}, state, {
          page: 1,
          facet_query: [].concat((0, _toConsumableArray3['default'])(state.facet_query), [(0, _extends3['default'])({}, action.facet, {
            selected: [action.value]
          })])
        });
      }

    case _ActionTypes2['default'].REMOVE_FACET:
      return (0, _extends3['default'])({}, state, {
        page: 1,
        facet_query: state.facet_query.map(function (item) {
          if (item.name === action.facet.name) {
            return (0, _extends3['default'])({}, item, {
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
        return (0, _extends3['default'])({}, state, {
          page: 1,
          facet_query: state.facet_query.map(function (item) {
            if (item.name === action.facet.name) {
              return (0, _extends3['default'])({}, item, {
                selected: [action.value]
              });
            }
            return item;
          })
        });
      } else {
        return (0, _extends3['default'])({}, state, {
          page: 1,
          facet_query: [].concat((0, _toConsumableArray3['default'])(state.facet_query), [(0, _extends3['default'])({}, action.facet, {
            selected: [action.value]
          })])
        });
      }

    case _ActionTypes2['default'].REMOVE_FACET_ITEM:
      return (0, _extends3['default'])({}, state, {
        page: 1,
        facet_query: state.facet_query.filter(function (item) {
          return item.name !== action.facet.name;
        })
      });

    case _ActionTypes2['default'].REMOVE_ALL_FACETS:
      return (0, _extends3['default'])({}, state, {
        facet_query: [],
        page: 1
      });

    case _ActionTypes2['default'].CHANGE_SORT:
      return (0, _extends3['default'])({}, state, {
        sort: action.sort || '',
        page: 1
      });

    case _ActionTypes2['default'].CHANGE_PAGE:
      return (0, _extends3['default'])({}, state, {
        page: action.page
      });

    case _ActionTypes2['default'].CHANGE_PER_PAGE:
      return (0, _extends3['default'])({}, state, {
        per_page: action.perPage
      });

    case _ActionTypes2['default'].CHANGE_VIEW:
      return (0, _extends3['default'])({}, state, {
        view: action.view
      });

    case _ActionTypes2['default'].SET_SEARCH_STATUS:
      return (0, _extends3['default'])({}, state, {
        isSearchActive: action.status
      });

    case _ActionTypes2['default'].REQUEST_SEARCH_SUCCESS:
      return (0, _extends3['default'])({}, state, {
        enriched_q: action.enriched_q || '',
        facet_query: action.facetQuery ? action.facetQuery : state.facet_query,
        /* Reset source */
        source: null
      });

    case _ActionTypes2['default'].OLA_REHYDRATE:
      return (0, _extends3['default'])({}, state, {
        projectId: action.projectId,
        env: action.env,
        debug: action.debug
      });

    case _ActionTypes2['default'].CHANGE_ENVIRONMENT:
      return (0, _extends3['default'])({}, state, {
        env: action.env
      });

    case _ActionTypes2['default'].UPDATE_OLA_PARAMETERS:
      return (0, _extends3['default'])({}, state, action.params);

    case _ActionTypes2['default'].SET_SEARCH_SOURCE:
      return (0, _extends3['default'])({}, state, {
        source: action.source
      });

    default:
      return state;
  }
};
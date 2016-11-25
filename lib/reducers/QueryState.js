'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _utilities = require('./../utilities');

var _Settings = require('./../constants/Settings');

var _equals = require('ramda/src/equals');

var _equals2 = require('../../.babelhelper.js').interopRequireDefault(_equals);

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
  skip_intent: false
};

/* Prevents redeclared variables for `JS Standard` compatiblity */
var exists;

exports['default'] = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].ADD_FILTER:
      var filter = action.filter;
      var selected = action.selected;

      exists = (0, _utilities.checkIfFacetExists)(state.filters, filter.name);
      if (exists) {
        return require('../../.babelhelper.js')['extends']({}, state, {
          page: 1,
          filters: state.filters.map(function (item) {
            if (item.name === filter.name) {
              return require('../../.babelhelper.js')['extends']({}, item, {
                selected: selected
              });
            }
            return item;
          })
        });
      } else {
        return require('../../.babelhelper.js')['extends']({}, state, {
          page: 1,
          filters: [].concat(require('../../.babelhelper.js').toConsumableArray(state.filters), [require('../../.babelhelper.js')['extends']({}, filter, { selected: selected })])
        });
      }

    case _ActionTypes2['default'].SET_SKIP_INTENT:
      return require('../../.babelhelper.js')['extends']({}, state, {
        skip_intent: action.flag
      });

    case _ActionTypes2['default'].REMOVE_FILTER:
      return require('../../.babelhelper.js')['extends']({}, state, {
        filters: state.filters.filter(function (item) {
          return item.name !== action.name;
        }),
        page: 1
      });

    case _ActionTypes2['default'].CLEAR_FILTERS:
      return require('../../.babelhelper.js')['extends']({}, state, {
        page: 1,
        filters: []
      });

    case _ActionTypes2['default'].UPDATE_STATE_FROM_QUERY:
      /* Reason: tennis players => click on snippet => come back to listing page from detail */
      return require('../../.babelhelper.js')['extends']({}, state, action.stateFromUrl, {
        referrer: '',
        searchInput: _Settings.SEARCH_INPUTS.URL,
        skip_intent: false
      });

    case _ActionTypes2['default'].UPDATE_QUERY_TERM:
      return require('../../.babelhelper.js')['extends']({}, state, {
        q: action.term,
        searchInput: action.searchInput || _Settings.SEARCH_INPUTS.KEYBOARD,
        enriched_q: '',
        page: 1,
        skip_intent: false
      });

    case _ActionTypes2['default'].CLEAR_ENRICHED_QUERY:
      return require('../../.babelhelper.js')['extends']({}, state, {
        enriched_q: ''
      });

    case _ActionTypes2['default'].CLEAR_QUERY_TERM:
      return require('../../.babelhelper.js')['extends']({}, state, {
        q: '',
        page: 1
      });

    case _ActionTypes2['default'].ADD_FACET:
      exists = (0, _utilities.checkIfFacetExists)(state.facet_query, action.facet.name);
      if (exists) {
        return require('../../.babelhelper.js')['extends']({}, state, {
          page: 1,
          facet_query: state.facet_query.map(function (item) {
            if (item.name === action.facet.name) {
              return require('../../.babelhelper.js')['extends']({}, item, {
                selected: [].concat(require('../../.babelhelper.js').toConsumableArray(item.selected), [action.value])
              });
            }
            return item;
          })
        });
      } else {
        return require('../../.babelhelper.js')['extends']({}, state, {
          page: 1,
          facet_query: [].concat(require('../../.babelhelper.js').toConsumableArray(state.facet_query), [require('../../.babelhelper.js')['extends']({}, action.facet, {
            selected: [action.value]
          })])
        });
      }

    case _ActionTypes2['default'].REMOVE_FACET:
      return require('../../.babelhelper.js')['extends']({}, state, {
        page: 1,
        facet_query: state.facet_query.map(function (item) {
          if (item.name === action.facet.name) {
            return require('../../.babelhelper.js')['extends']({}, item, {
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
        return require('../../.babelhelper.js')['extends']({}, state, {
          page: 1,
          facet_query: state.facet_query.map(function (item) {
            if (item.name === action.facet.name) {
              return require('../../.babelhelper.js')['extends']({}, item, {
                selected: [action.value]
              });
            }
            return item;
          })
        });
      } else {
        return require('../../.babelhelper.js')['extends']({}, state, {
          page: 1,
          facet_query: [].concat(require('../../.babelhelper.js').toConsumableArray(state.facet_query), [require('../../.babelhelper.js')['extends']({}, action.facet, {
            selected: [action.value]
          })])
        });
      }

    case _ActionTypes2['default'].REMOVE_FACET_ITEM:
      return require('../../.babelhelper.js')['extends']({}, state, {
        page: 1,
        facet_query: state.facet_query.filter(function (item) {
          return item.name !== action.facet.name;
        })
      });

    case _ActionTypes2['default'].REMOVE_ALL_FACETS:
      return require('../../.babelhelper.js')['extends']({}, state, {
        facet_query: [],
        page: 1
      });

    case _ActionTypes2['default'].CHANGE_SORT:
      return require('../../.babelhelper.js')['extends']({}, state, {
        sort: action.sort || '',
        page: 1
      });

    case _ActionTypes2['default'].CHANGE_PAGE:
      return require('../../.babelhelper.js')['extends']({}, state, {
        page: action.page
      });

    case _ActionTypes2['default'].CHANGE_PER_PAGE:
      return require('../../.babelhelper.js')['extends']({}, state, {
        per_page: action.perPage
      });

    case _ActionTypes2['default'].CHANGE_VIEW:
      return require('../../.babelhelper.js')['extends']({}, state, {
        view: action.view
      });

    case _ActionTypes2['default'].SET_SEARCH_STATUS:
      return require('../../.babelhelper.js')['extends']({}, state, {
        isSearchActive: action.status
      });

    case _ActionTypes2['default'].REQUEST_SEARCH_SUCCESS:
      return require('../../.babelhelper.js')['extends']({}, state, {
        enriched_q: action.enriched_q || ''
      });

    default:
      return state;
  }
};
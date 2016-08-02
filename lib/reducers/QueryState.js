'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _utilities = require('./../utilities');

var _indexOf = require('ramda/src/indexOf');

var _indexOf2 = require('../../.babelhelper.js').interopRequireDefault(_indexOf);

var _omit = require('ramda/src/omit');

var _omit2 = require('../../.babelhelper.js').interopRequireDefault(_omit);

var _clone = require('ramda/src/clone');

var _clone2 = require('../../.babelhelper.js').interopRequireDefault(_clone);

var _Settings = require('./../constants/Settings');

var initialState = {
  q: '',
  page: 1,
  per_page: 10,
  facet_query: [],
  sort: '',
  filters: [],
  view: '',
  isSearchActive: true,
  searchInput: null
};

/* Prevents redeclared variables for `JS Standard` compatiblity */
var fq, facet, value, index, props, exists;

exports['default'] = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].ADD_FILTER:
      var _action$payload = action.payload;
      var filter = _action$payload.filter;
      var selected = _action$payload.selected;

      index = (0, _utilities.checkIfFacetExists)(state.filters, filter.name);
      if (index !== null) {
        return require('../../.babelhelper.js')['extends']({}, state, {
          filters: [].concat(require('../../.babelhelper.js').toConsumableArray(state.filters), [require('../../.babelhelper.js')['extends']({}, filter, { selected: selected })])
        });
      } else {
        return require('../../.babelhelper.js')['extends']({}, state, {
          filters: state.filters.map(function (item) {
            if (item.name === filter.name) {
              return require('../../.babelhelper.js')['extends']({}, item, {
                selected: selected
              });
            }
            return item;
          })
        });
      }

    case _ActionTypes2['default'].REMOVE_FILTER:
      return require('../../.babelhelper.js')['extends']({}, state, {
        filters: state.filters.filter(function (item) {
          return item.name !== action.payload.name;
        }),
        page: 1
      });

    case _ActionTypes2['default'].CLEAR_FILTERS:
      return require('../../.babelhelper.js')['extends']({}, state, {
        filters: []
      });

    case _ActionTypes2['default'].UPDATE_STATE_FROM_QUERY:
      return require('../../.babelhelper.js')['extends']({}, action.stateFromUrl, {
        referrer: '',
        searchInput: _Settings.SEARCH_INPUTS.URL
      });

    case _ActionTypes2['default'].UPDATE_QUERY_TERM:
      return require('../../.babelhelper.js')['extends']({}, state, {
        q: action.term,
        searchInput: action.searchInput || _Settings.SEARCH_INPUTS.KEYBOARD,
        page: 1
      });

    case _ActionTypes2['default'].CLEAR_QUERY_TERM:
      return require('../../.babelhelper.js')['extends']({}, state, {
        q: '',
        page: 1
      });

    case _ActionTypes2['default'].ADD_FACET:
      index = (0, _utilities.checkIfFacetExists)(state.facet_query, action.facet.name);
      if (index !== null) {
        return require('../../.babelhelper.js')['extends']({}, state, {
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
          facet_query: [].concat(require('../../.babelhelper.js').toConsumableArray(state.facet_query), [require('../../.babelhelper.js')['extends']({}, action.facet, {
            selected: [action.value]
          })])
        });
      }

    case _ActionTypes2['default'].REMOVE_FACET:
      return require('../../.babelhelper.js')['extends']({}, state, {
        facet_query: state.facet_query.map(function (item) {
          if (item.name === action.facet.name) {
            var i = (0, _indexOf2['default'])(action.value, item.selected);
            return require('../../.babelhelper.js')['extends']({}, item, {
              selected: [].concat(require('../../.babelhelper.js').toConsumableArray(item.selected.slice(0, i)), require('../../.babelhelper.js').toConsumableArray(item.selected.slice(i + 1)))
            });
          }
          return item;
        }).filter(function (item) {
          return item.selected.length;
        })
      });

    case _ActionTypes2['default'].REPLACE_FACET:
      index = (0, _utilities.checkIfFacetExists)(state.facet_query, action.facet.name);
      if (index !== null) {
        return require('../../.babelhelper.js')['extends']({}, state, {
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
          facet_query: [].concat(require('../../.babelhelper.js').toConsumableArray(state.facet_query), [require('../../.babelhelper.js')['extends']({}, action.facet, {
            selected: [action.value]
          })])
        });
      }

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

    default:
      return state;
  }
};
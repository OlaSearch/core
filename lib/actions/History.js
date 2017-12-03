'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debouceAddHistory = undefined;
exports.addHistory = addHistory;
exports.clearHistory = clearHistory;
exports.removeHistory = removeHistory;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _urlSync = require('./../services/urlSync');

var _omit = require('ramda/src/omit');

var _omit2 = _interopRequireDefault(_omit);

var _utilities = require('./../utilities');

var _dateParser = require('./../utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// import flatten from 'ramda/src/flatten'
function addHistory(options) {
  return function (dispatch, getState) {
    var _getState = getState(),
        QueryState = _getState.QueryState,
        AppState = _getState.AppState;

    var q = QueryState.q,
        facet_query = QueryState.facet_query;
    var totalResults = AppState.totalResults,
        history = AppState.history;

    if (!q || !totalResults || q === '*') return;

    /* Filtering history */
    var query = (0, _omit2['default'])(['page', 'per_page', 'referrer', 'facet_query', 'filters'], QueryState);
    var activeFacets = [];
    // flatten(
    //   facet_query.map((item) => {
    //     let { selected, template, dateFormat, type, name } = item
    //     switch (type) {
    //       case 'range':
    //       case 'daterange':
    //       case 'datepicker':
    //         if (typeof selected === 'string') {
    //           return selected
    //         } else {
    //           return selected.map((item) => {
    //             let [from, to] = item
    //             return `${name}:${supplant(template, {
    //               from: dateFormat ? DateParser.format(from, dateFormat) : from,
    //               to: dateFormat ? DateParser.format(to, dateFormat) : to
    //             })}`
    //           })
    //         }

    //       default:
    //         return `${name}:${selected}`
    //     }
    //   })
    // )

    /* Check if it already exists */
    var exists = history.some(function (item) {
      return item.q === q;
    });

    /* Check if history already exists */
    if (exists) {
      return dispatch({
        type: _ActionTypes2['default'].UPDATE_HISTORY,
        q: q,
        dateAdded: new Date().getTime()
      });
    }

    dispatch({
      type: _ActionTypes2['default'].ADD_HISTORY,
      history: {
        q: q,
        url: _urlSync.character + (0, _urlSync.buildQueryString)(query),
        dateAdded: new Date().getTime(),
        facets: activeFacets,
        popularity: 1
      }
    });
  };
}

function clearHistory() {
  return {
    type: _ActionTypes2['default'].CLEAR_HISTORY
  };
}

function removeHistory(result) {
  return {
    type: _ActionTypes2['default'].REMOVE_HISTORY,
    result: result
  };
}

/* Adds to History */
var debouceAddHistory = exports.debouceAddHistory = (0, _utilities.debounce)(_addHistory, 600);

/**
 * Takes dispatch as first argument
 * @param {function} dispatch
 */
function _addHistory(dispatch, options) {
  dispatch(addHistory(options));
}
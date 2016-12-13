'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debouceAddHistory = undefined;
exports.addHistory = addHistory;
exports.clearHistory = clearHistory;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _urlSync = require('./../services/urlSync');

var _omit = require('ramda/src/omit');

var _omit2 = require('../../.babelhelper.js').interopRequireDefault(_omit);

var _flatten = require('ramda/src/flatten');

var _flatten2 = require('../../.babelhelper.js').interopRequireDefault(_flatten);

var _equals = require('ramda/src/equals');

var _equals2 = require('../../.babelhelper.js').interopRequireDefault(_equals);

var _utilities = require('./../utilities');

var _dateParser = require('./../utilities/dateParser');

var _dateParser2 = require('../../.babelhelper.js').interopRequireDefault(_dateParser);

function addHistory(options) {
  return function (dispatch, getState) {
    var _getState = getState();

    var QueryState = _getState.QueryState;
    var AppState = _getState.AppState;
    var q = QueryState.q;
    var facet_query = QueryState.facet_query;
    var totalResults = AppState.totalResults;
    var history = AppState.history;

    if (!q || !totalResults) return;

    /* Filtering history */
    var query = (0, _omit2['default'])(['page', 'per_page', 'referrer'], QueryState);
    var activeFacets = (0, _flatten2['default'])(facet_query.map(function (item) {
      var selected = item.selected;
      var template = item.template;
      var dateFormat = item.dateFormat;
      var type = item.type;
      var name = item.name;

      switch (type) {
        case 'range':
          if (typeof selected === 'string') {
            return selected;
          } else {
            var _selected = require('../../.babelhelper.js').slicedToArray(selected, 2);

            var _from = _selected[0];
            var _to = _selected[1];

            return name + ':' + (0, _utilities.supplant)(template, { from: _from, to: _to });
          }
        case 'daterange':
          var _selected$ = require('../../.babelhelper.js').slicedToArray(selected[0], 2);

          var from = _selected$[0];
          var to = _selected$[1];

          var fromDate = new Date(parseInt(from));
          var toDate = new Date(parseInt(to));
          return name + ': ' + (0, _utilities.supplant)(template, {
            from: _dateParser2['default'].format(fromDate, dateFormat),
            to: _dateParser2['default'].format(toDate, dateFormat)
          });

        default:
          return name + ':' + selected;
      }
    }));

    /* Check if it already exists */
    var exists = history.some(function (item) {
      return item.q === q && (0, _equals2['default'])(item.facets, activeFacets);
    });

    /* Check if history already exists */
    if (exists) return;

    dispatch({
      type: _ActionTypes2['default'].ADD_HISTORY,
      history: {
        q: q,
        url: _urlSync.character + (0, _urlSync.buildQueryString)(query),
        dateAdded: new Date().getTime(),
        facets: activeFacets
      }
    });
  };
}

function clearHistory() {
  return {
    type: _ActionTypes2['default'].CLEAR_HISTORY
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
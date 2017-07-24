'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debouceAddHistory = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.addHistory = addHistory;
exports.clearHistory = clearHistory;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _urlSync = require('./../services/urlSync');

var _omit = require('ramda/src/omit');

var _omit2 = _interopRequireDefault(_omit);

var _flatten = require('ramda/src/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _utilities = require('./../utilities');

var _dateParser = require('./../utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
    var query = (0, _omit2['default'])(['page', 'per_page', 'referrer'], QueryState);
    var activeFacets = (0, _flatten2['default'])(facet_query.map(function (item) {
      var selected = item.selected,
          template = item.template,
          dateFormat = item.dateFormat,
          type = item.type,
          name = item.name;

      switch (type) {
        case 'range':
        case 'daterange':
        case 'datepicker':
          if (typeof selected === 'string') {
            return selected;
          } else {
            return selected.map(function (item) {
              var _item = (0, _slicedToArray3['default'])(item, 2),
                  from = _item[0],
                  to = _item[1];

              return name + ':' + (0, _utilities.supplant)(template, {
                from: dateFormat ? _dateParser2['default'].format(from, dateFormat) : from,
                to: dateFormat ? _dateParser2['default'].format(to, dateFormat) : to
              });
            });
          }

        default:
          return name + ':' + selected;
      }
    }));

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

/* Adds to History */
var debouceAddHistory = exports.debouceAddHistory = (0, _utilities.debounce)(_addHistory, 600);

/**
 * Takes dispatch as first argument
 * @param {function} dispatch
 */
function _addHistory(dispatch, options) {
  dispatch(addHistory(options));
}
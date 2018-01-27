'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.fetchAlerts = fetchAlerts;
exports.deleteAlert = deleteAlert;
exports.removeDocs = removeDocs;
exports.createAlert = createAlert;
exports.viewedAlert = viewedAlert;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function fetchAlerts() {
  return function (dispatch, getState) {
    var userId = getState().Context.userId;

    dispatch({
      types: [_ActionTypes2['default'].REQUEST_ALERT, _ActionTypes2['default'].REQUEST_ALERT_SUCCESS, _ActionTypes2['default'].REQUEST_ALERT_FAILURE],
      processData: function processData(response) {
        var queryIds = response.map(function (_ref) {
          var queryId = _ref.queryId;
          return queryId;
        });
        var queriesById = response.reduce(function (acc, obj) {
          acc[obj.queryId] = obj;
          return acc;
        }, {});
        return (0, _extends3['default'])({}, response, {
          extra: {
            queryIds: queryIds,
            queriesById: queriesById
          }
        });
      },
      query: {},
      meta: {
        log: false,
        apiOptions: {
          path: '/docs',
          method: 'GET',
          params: {
            userId: userId
          }
        }
      },
      api: 'alert'
    });
  };
}

function deleteAlert(queryId) {
  return function (dispatch, getState) {
    var payload = { queryId: queryId };
    dispatch({
      types: [_ActionTypes2['default'].REQUEST_DELETE_ALERT, _ActionTypes2['default'].REQUEST_DELETE_ALERT_SUCCESS, _ActionTypes2['default'].REQUEST_DELETE_ALERT_FAILURE],
      query: {},
      meta: {
        log: false,
        apiOptions: {
          method: 'POST',
          path: '/queries/remove',
          params: payload
        }
      },
      payload: payload,
      api: 'alert'
    });
  };
}

function removeDocs(queryId) {
  return function (dispatch, getState) {
    var payload = { queryId: queryId };
    dispatch({
      types: [_ActionTypes2['default'].REQUEST_DELETE_ALERT_DOCS, _ActionTypes2['default'].REQUEST_DELETE_ALERT_DOCS_SUCCESS, _ActionTypes2['default'].REQUEST_DELETE_ALERT_DOCS_FAILURE],
      query: {},
      meta: {
        log: false,
        apiOptions: {
          method: 'POST',
          path: '/docs/remove',
          params: payload
        }
      },
      payload: payload,
      api: 'alert'
    });
  };
}

function createAlert(query) {
  return function (dispatch, getState) {
    var userId = getState().Context.userId;

    var payload = { userId: userId, query: query };
    dispatch({
      types: [_ActionTypes2['default'].REQUEST_CREATE_ALERT, _ActionTypes2['default'].REQUEST_CREATE_ALERT_SUCCESS, _ActionTypes2['default'].REQUEST_CREATE_ALERT_FAILURE],
      processData: function processData(response) {
        var _queriesById;

        var queryId = response.queryId,
            query = response.query,
            timestamp = response.timestamp,
            docIds = response.docIds;

        return (0, _extends3['default'])({}, response, {
          extra: {
            queryId: queryId,
            queriesById: (_queriesById = {}, _queriesById[queryId] = {
              query: query,
              timestamp: timestamp,
              docIds: docIds
            }, _queriesById)
          }
        });
      },
      query: {},
      meta: {
        log: false,
        apiOptions: {
          method: 'POST',
          path: '/queries/add',
          params: payload
        }
      },
      payload: payload,
      api: 'alert'
    });
  };
}

function viewedAlert(query) {
  return function (dispatch, getState) {};
}
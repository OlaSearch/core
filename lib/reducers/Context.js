'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _Settings = require('./../constants/Settings');

var _storage = require('./../services/storage');

var _storage2 = require('../../.babelhelper.js').interopRequireDefault(_storage);

var valueFromStorage = _storage2['default'].cookies.get(_Settings.CONTEXT_STORAGE_KEY);
var initialState = exports.initialState = require('../../.babelhelper.js')['extends']({
  location: null,
  fields: [],
  isRequestingLocation: false,
  hasRequestedLocation: false,
  userId: null
}, valueFromStorage ? JSON.parse(valueFromStorage) : {});

exports['default'] = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].REQUEST_GEO_LOCATION:
      return require('../../.babelhelper.js')['extends']({}, state, {
        isRequestingLocation: true
      });
    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_SUCCESS:
      var _action$payload$coord = action.payload.coords;
      var latitude = _action$payload$coord.latitude;
      var longitude = _action$payload$coord.longitude;

      return require('../../.babelhelper.js')['extends']({}, state, {
        isRequestingLocation: false,
        location: latitude + ',' + longitude
      });

    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_FAILURE:
      return require('../../.babelhelper.js')['extends']({}, state, {
        isRequestingLocation: false,
        location: null
      });
    case _ActionTypes2['default'].ADD_CONTEXT:
      if (action.contextType === 'geo') {
        return require('../../.babelhelper.js')['extends']({}, state, {
          location: action.value
        });
      }
      return state;
    case _ActionTypes2['default'].REMOVE_CONTEXT:
      if (action.contextType === 'geo') {
        return require('../../.babelhelper.js')['extends']({}, state, {
          location: null,
          fields: [],
          hasRequestedLocation: !!state.location
        });
      }
      return state;

    case _ActionTypes2['default'].ADD_DYNAMIC_FIELD:
      var filtered = state.fields.filter(function (field) {
        return field.name !== action.name;
      });
      return require('../../.babelhelper.js')['extends']({}, state, {
        fields: [].concat(require('../../.babelhelper.js').toConsumableArray(filtered), [{
          name: action.name,
          value: action.value,
          filename: action.filename
        }])
      });
    case _ActionTypes2['default'].REMOVE_DYNAMIC_FIELD:
      return require('../../.babelhelper.js')['extends']({}, state, {
        fields: state.fields.filter(function (field) {
          return field.name !== action.name;
        })
      });

    case _ActionTypes2['default'].SET_INTENT_SESSION_ID:
      return require('../../.babelhelper.js')['extends']({}, state, {
        userId: action.userId
      });

    default:
      return state;
  }
};
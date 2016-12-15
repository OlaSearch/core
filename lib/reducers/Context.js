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
  userSession: null,
  userId: null,
  isNewUser: false
}, valueFromStorage ? JSON.parse(valueFromStorage) : {}, {
  /* Filter sequence */
  filter_term_sequence: [] /* For logging the sequence of filters that the user used */
});

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

    /** Filter sequence */
    case _ActionTypes2['default'].ADD_FACET:
      return require('../../.babelhelper.js')['extends']({}, state, {
        filter_term_sequence: [].concat(require('../../.babelhelper.js').toConsumableArray(state.filter_term_sequence), [action.facet.name + ':' + action.value])
      });

    case _ActionTypes2['default'].REMOVE_FACET:
      return require('../../.babelhelper.js')['extends']({}, state, {
        filter_term_sequence: state.filter_term_sequence.filter(function (item) {
          return item !== action.facet.name + ':' + action.value;
        })
      });

    case _ActionTypes2['default'].OLA_REHYDRATE:
      var userSession = _storage2['default'].cookies.get(_Settings.USER_SESSION_KEY, action.namespace);
      return require('../../.babelhelper.js')['extends']({}, state, {
        userSession: userSession,
        userId: action.userId || userSession,
        isNewUser: action.isNewUser
      });

    default:
      return state;
  }
};
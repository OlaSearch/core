'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _Settings = require('./../constants/Settings');

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var valueFromStorage = _storage2['default'].cookies.get(_Settings.CONTEXT_STORAGE_KEY);
var initialState = exports.initialState = _extends({
  location: null,
  fields: [],
  isRequestingLocation: false,
  hasRequestedLocation: false,
  userSession: null,
  userId: null,
  isNewUser: false,
  hasUsedVoice: false
}, valueFromStorage ? JSON.parse(decodeURIComponent(valueFromStorage)) : {}, {
  /* Filter sequence */
  filter_term_sequence: [] /* For logging the sequence of filters that the user used */
});

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].REQUEST_GEO_LOCATION:
      return _extends({}, state, {
        isRequestingLocation: true
      });

    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_SUCCESS:
      var _action$payload$coord = action.payload.coords,
          latitude = _action$payload$coord.latitude,
          longitude = _action$payload$coord.longitude;

      return _extends({}, state, {
        isRequestingLocation: false,
        location: latitude + ',' + longitude
      });

    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_FAILURE:
      return _extends({}, state, {
        isRequestingLocation: false,
        location: null
      });

    case _ActionTypes2['default'].ADD_CONTEXT:
      if (action.contextType === 'geo') {
        return _extends({}, state, {
          location: action.value
        });
      }
      return state;

    case _ActionTypes2['default'].REMOVE_CONTEXT:
      if (action.contextType === 'geo') {
        return _extends({}, state, {
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
      return _extends({}, state, {
        fields: [].concat(_toConsumableArray(filtered), [{
          name: action.name,
          value: action.value,
          filename: action.filename
        }])
      });
    case _ActionTypes2['default'].REMOVE_DYNAMIC_FIELD:
      return _extends({}, state, {
        fields: state.fields.filter(function (field) {
          return field.name !== action.name;
        })
      });

    /* Filter sequence from url */
    case _ActionTypes2['default'].UPDATE_STATE_FROM_QUERY:
      var seq = [];
      var fq = action.stateFromUrl.facet_query;
      for (var i = 0, len = fq.length; i < len; i++) {
        for (var j = 0; j < fq[i].selected.length; j++) {
          seq.push(fq[i].name + ':' + fq[i].selected[j]);
        }
      }
      return _extends({}, state, {
        filter_term_sequence: seq
      });

    /** Filter sequence */
    case _ActionTypes2['default'].ADD_FACET:
      return _extends({}, state, {
        filter_term_sequence: [].concat(_toConsumableArray(state.filter_term_sequence), [action.facet.name + ':' + action.value])
      });

    case _ActionTypes2['default'].REMOVE_FACET:
      return _extends({}, state, {
        filter_term_sequence: state.filter_term_sequence.filter(function (item) {
          return item !== action.facet.name + ':' + action.value;
        })
      });

    case _ActionTypes2['default'].REPLACE_FACET:
      var fts = state.filter_term_sequence.filter(function (item) {
        return item.split(':')[0] === action.facet.name;
      });
      return _extends({}, state, {
        filter_term_sequence: [].concat(_toConsumableArray(fts), [action.facet.name + ':' + action.value])
      });

    case _ActionTypes2['default'].REMOVE_FACET_ITEM:
      return _extends({}, state, {
        filter_term_sequence: state.filter_term_sequence.filter(function (item) {
          return item.split(':')[0] !== action.facet.name;
        })
      });

    case _ActionTypes2['default'].REMOVE_ALL_FACETS:
      return _extends({}, state, {
        filter_term_sequence: []
      });

    case _ActionTypes2['default'].ADD_CONTEXT_FIELD:
      return _extends({}, state, _defineProperty({}, action.field, action.value));

    case _ActionTypes2['default'].OLA_REHYDRATE:
      var userSession = _storage2['default'].cookies.get(_Settings.USER_SESSION_KEY, action.namespace);
      return _extends({}, state, {
        userSession: userSession,
        userId: action.userId || userSession,
        isNewUser: action.isNewUser
      });

    default:
      return state;
  }
};
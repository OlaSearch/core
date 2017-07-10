'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _Settings = require('./../constants/Settings');

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var initialState = exports.initialState = {
  location: null,
  fields: [],
  isRequestingLocation: false,
  hasRequestedLocation: false,
  userSession: null,
  searchSession: null,
  userId: null,
  isNewUser: false,
  hasUsedVoice: false,
  /* Filter sequence */
  filter_term_sequence: [] /* For logging the sequence of filters that the user used */
};

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].REQUEST_GEO_LOCATION:
      return (0, _extends4['default'])({}, state, {
        isRequestingLocation: true
      });

    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_SUCCESS:
      var _action$payload$coord = action.payload.coords,
          latitude = _action$payload$coord.latitude,
          longitude = _action$payload$coord.longitude;

      return (0, _extends4['default'])({}, state, {
        isRequestingLocation: false,
        location: latitude + ',' + longitude
      });

    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_FAILURE:
      return (0, _extends4['default'])({}, state, {
        isRequestingLocation: false,
        location: null
      });

    case _ActionTypes2['default'].ADD_CONTEXT:
      if (action.contextType === 'geo') {
        return (0, _extends4['default'])({}, state, {
          location: action.value
        });
      }
      return state;

    case _ActionTypes2['default'].REMOVE_CONTEXT:
      if (action.contextType === 'geo') {
        return (0, _extends4['default'])({}, state, {
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
      return (0, _extends4['default'])({}, state, {
        fields: [].concat((0, _toConsumableArray3['default'])(filtered), [{
          name: action.name,
          value: action.value,
          filename: action.filename
        }])
      });
    case _ActionTypes2['default'].REMOVE_DYNAMIC_FIELD:
      return (0, _extends4['default'])({}, state, {
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
      return (0, _extends4['default'])({}, state, {
        filter_term_sequence: seq
      });

    /** Filter sequence */
    case _ActionTypes2['default'].ADD_FACET:
      return (0, _extends4['default'])({}, state, {
        filter_term_sequence: [].concat((0, _toConsumableArray3['default'])(state.filter_term_sequence), [action.facet.name + ':' + action.value])
      });

    case _ActionTypes2['default'].REMOVE_FACET:
      return (0, _extends4['default'])({}, state, {
        filter_term_sequence: state.filter_term_sequence.filter(function (item) {
          return item !== action.facet.name + ':' + action.value;
        })
      });

    case _ActionTypes2['default'].REPLACE_FACET:
      var fts = state.filter_term_sequence.filter(function (item) {
        return item.split(':')[0] === action.facet.name;
      });
      return (0, _extends4['default'])({}, state, {
        filter_term_sequence: [].concat((0, _toConsumableArray3['default'])(fts), [action.facet.name + ':' + action.value])
      });

    case _ActionTypes2['default'].REMOVE_FACET_ITEM:
      return (0, _extends4['default'])({}, state, {
        filter_term_sequence: state.filter_term_sequence.filter(function (item) {
          return item.split(':')[0] !== action.facet.name;
        })
      });

    case _ActionTypes2['default'].REMOVE_ALL_FACETS:
      return (0, _extends4['default'])({}, state, {
        filter_term_sequence: []
      });

    case _ActionTypes2['default'].ADD_CONTEXT_FIELD:
      return (0, _extends4['default'])({}, state, (0, _defineProperty3['default'])({}, action.field, action.value));

    case _ActionTypes2['default'].OLA_REHYDRATE:
      var userSession = action.userSession,
          searchSession = action.searchSession,
          isNewUser = action.isNewUser,
          userId = action.userId;

      var contextFromStorage = _storage2['default'].cookies.get(_Settings.CONTEXT_STORAGE_KEY, action.namespace);
      if (typeof contextFromStorage === 'string') {
        try {
          contextFromStorage = JSON.parse(decodeURIComponent(contextFromStorage));
        } catch (e) {
          contextFromStorage = {};
        }
      }
      return (0, _extends4['default'])({}, state, {
        userSession: userSession,
        searchSession: searchSession
      }, contextFromStorage, {
        userId: userId || userSession,
        isNewUser: isNewUser
      });

    case _ActionTypes2['default'].SET_NEW_USER_STATUS:
      return (0, _extends4['default'])({}, state, {
        isNewUser: action.isNewUser
      });

    default:
      return state;
  }
};
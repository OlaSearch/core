'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _flatten = require('ramda/src/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LOCATION_FIELD = 'location';

var initialState = exports.initialState = {
  fields: [],

  /* For Geo Location */
  location: null,
  isRequestingLocation: false,
  hasRequestedLocation: false,

  userSession: null,
  searchSession: null,
  userId: null,
  isNewUser: false,

  /* Voice */
  hasUsedVoice: false,

  /* Filter sequence */
  filter_term_sequence: [] /* For logging the sequence of filters that the user used */
};

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].REQUEST_GEO_LOCATION:
      return (0, _extends3['default'])({}, state, {
        isRequestingLocation: true
      });

    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_SUCCESS:
      var _action$payload$coord = action.payload.coords,
          latitude = _action$payload$coord.latitude,
          longitude = _action$payload$coord.longitude;

      return (0, _extends3['default'])({}, state, {
        isRequestingLocation: false,
        hasRequestedLocation: true,
        location: latitude + ',' + longitude
      });

    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_FAILURE:
      return (0, _extends3['default'])({}, state, {
        isRequestingLocation: false,
        hasRequestedLocation: true,
        location: null

        /* Filter sequence from facet_query */
      });case _ActionTypes2['default'].UPDATE_STATE_FROM_QUERY:
      return (0, _extends3['default'])({}, state, {
        filter_term_sequence: (0, _flatten2['default'])(action.stateFromUrl.facet_query.map(function (_ref) {
          var name = _ref.name,
              selected = _ref.selected;
          return selected.map(function (value) {
            return name + ':' + value;
          });
        }))

        /** Filter sequence */
      });case _ActionTypes2['default'].ADD_FACET:
      return (0, _extends3['default'])({}, state, {
        filter_term_sequence: [].concat(state.filter_term_sequence, [action.facet.name + ':' + action.value])
      });

    case _ActionTypes2['default'].REMOVE_FACET:
      return (0, _extends3['default'])({}, state, {
        filter_term_sequence: state.filter_term_sequence.filter(function (item) {
          return item !== action.facet.name + ':' + action.value;
        })
      });

    case _ActionTypes2['default'].REPLACE_FACET:
      var fts = state.filter_term_sequence.filter(function (item) {
        return item.split(':')[0] === action.facet.name;
      });
      return (0, _extends3['default'])({}, state, {
        filter_term_sequence: [].concat(fts, [action.facet.name + ':' + action.value])
      });

    case _ActionTypes2['default'].REMOVE_FACET_ITEM:
      return (0, _extends3['default'])({}, state, {
        filter_term_sequence: state.filter_term_sequence.filter(function (item) {
          return item.split(':')[0] !== action.facet.name;
        })
      });

    case _ActionTypes2['default'].REMOVE_ALL_FACETS:
      return (0, _extends3['default'])({}, state, {
        filter_term_sequence: []
      });

    case _ActionTypes2['default'].ADD_CONTEXT_FIELD:
      if (!action.field) return state;
      return (0, _extends3['default'])({}, state, {
        fields: [].concat(state.fields, [{ name: action.field, value: action.value }])
      });

    case _ActionTypes2['default'].REMOVE_CONTEXT_FIELD:
      if (!action.field) return state;
      return (0, _extends3['default'])({}, state, {
        fields: state.fields.filter(function (_ref2) {
          var name = _ref2.name;
          return name !== action.field;
        })
      });

    case _ActionTypes2['default'].REMOVE_CONTEXT_LOCATION:
      return (0, _extends3['default'])({}, state, {
        location: null
      });

    case _ActionTypes2['default'].OLA_REHYDRATE:
      var _userSession = action.userSession,
          _searchSession = action.searchSession,
          _isNewUser = action.isNewUser,
          _userId = action.userId,
          contextState = action.contextState;

      return (0, _extends3['default'])({}, state, {
        userSession: _userSession,
        searchSession: _searchSession
      }, contextState, {
        userId: _userId || _userSession,
        isNewUser: _isNewUser
      });

    case _ActionTypes2['default'].SET_NEW_USER_STATUS:
      return (0, _extends3['default'])({}, state, {
        isNewUser: action.isNewUser
      });

    default:
      return state;
  }
};
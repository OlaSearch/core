'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _Settings = require('./../constants/Settings');

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var valueFromStorage = _storage2['default'].cookies.get(_Settings.CONTEXT_STORAGE_KEY);
var initialState = valueFromStorage ? JSON.parse(valueFromStorage) : {
  location: null,
  fields: [],
  isRequestingLocation: false,
  hasRequestedLocation: false
};

exports['default'] = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].REQUEST_GEO_LOCATION:
      return _extends({}, state, {
        isRequestingLocation: true
      });
    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_SUCCESS:
      var coords = action.payload.coords;
      var latitude = coords.latitude;
      var longitude = coords.longitude;

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
      break;
    case _ActionTypes2['default'].REMOVE_CONTEXT:
      if (action.contextType === 'geo') {
        return _extends({}, state, {
          location: null,
          fields: [],
          hasRequestedLocation: !!state.location
        });
      }
      break;

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

    default:
      return state;
  }
};
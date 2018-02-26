'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestGeoLocation = requestGeoLocation;
exports.addContextField = addContextField;
exports.removeContextField = removeContextField;
exports.removeContextLocation = removeContextLocation;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function requestGeoLocation(onSuccess, onFailure) {
  if (!navigator.geolocation) return;
  return function (dispatch, getState) {
    dispatch({
      type: _ActionTypes2['default'].REQUEST_GEO_LOCATION
    });
    navigator.geolocation.getCurrentPosition(function (event) {
      dispatch({
        type: _ActionTypes2['default'].REQUEST_GEO_LOCATION_SUCCESS,
        payload: event
      });
      onSuccess && onSuccess(event);
    }, function (error) {
      console.warn(error);
      dispatch({
        type: _ActionTypes2['default'].REQUEST_GEO_LOCATION_FAILURE,
        payload: error
      });
      onFailure && onFailure(error);
    });
  };
}

function addContextField(field, value) {
  return {
    type: _ActionTypes2['default'].ADD_CONTEXT_FIELD,
    field: field,
    value: value
  };
}

function removeContextField(field) {
  return {
    type: _ActionTypes2['default'].REMOVE_CONTEXT_FIELD,
    field: field
  };
}

function removeContextLocation() {
  return {
    type: _ActionTypes2['default'].REMOVE_CONTEXT_LOCATION
  };
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDynamicField = addDynamicField;
exports.removeDynamicField = removeDynamicField;
exports.addContext = addContext;
exports.removeContext = removeContext;
exports.requestGeoLocation = requestGeoLocation;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function addDynamicField(name, value) {
  return {
    type: _ActionTypes2['default'].ADD_DYNAMIC_FIELD,
    name: name, value: value
  };
}

function removeDynamicField(name) {
  return {
    type: _ActionTypes2['default'].REMOVE_DYNAMIC_FIELD,
    name: name
  };
}

function addContext(contextType, value) {
  return {
    type: _ActionTypes2['default'].ADD_CONTEXT,
    contextType: contextType, value: value
  };
}

function removeContext(contextType) {
  return {
    type: _ActionTypes2['default'].REMOVE_CONTEXT,
    contextType: contextType
  };
}

function requestGeoLocation(onSuccess, onFailure) {
  return function (dispatch, getState) {
    if (navigator.geolocation) {
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
        dispatch({
          type: _ActionTypes2['default'].REQUEST_GEO_LOCATION_FAILURE,
          payload: error
        });

        onFailure && onFailure(error);
      });
    }
  };
}
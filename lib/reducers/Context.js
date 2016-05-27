'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var CONTEXT_STORAGE_KEY = 'ola_context';

var initialState = _storage2['default'].get(CONTEXT_STORAGE_KEY) || {
  location: null,
  fields: []
};

exports['default'] = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].ADD_CONTEXT:
      if (action.contextType === 'geo') {
        var _state = _extends({}, state, {
          location: action.value
        });
      }
      _storage2['default'].set(CONTEXT_STORAGE_KEY, _state);
      return _state;
    case _ActionTypes2['default'].REMOVE_CONTEXT:
      if (action.contextType === 'geo') {
        var _state = _extends({}, state, {
          location: null,
          fields: []
        });
      }
      _storage2['default'].set(CONTEXT_STORAGE_KEY, _state);
      return _state;

    case _ActionTypes2['default'].ADD_DYNAMIC_FIELD:
      var filtered = state.fields.filter(function (field) {
        return field.name !== action.name;
      });
      var _state = _extends({}, state, {
        fields: [].concat(_toConsumableArray(filtered), [{
          name: action.name,
          value: action.value
        }])
      });
      _storage2['default'].set(CONTEXT_STORAGE_KEY, _state);
      return _state;

    case _ActionTypes2['default'].REMOVE_DYNAMIC_FIELD:
      var _state = _extends({}, state, {
        fields: state.fields.filter(function (field) {
          return field.name !== action.name;
        })
      });
      _storage2['default'].set(CONTEXT_STORAGE_KEY, _state);
      return _state;

    default:
      return state;
  }
};
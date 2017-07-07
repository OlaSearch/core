'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounceLog = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.log = log;

var _utilities = require('./../utilities');

var _Settings = require('./../constants/Settings');

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Ola Logger Middleware intercepts this dispatch event and calls the loggerService
 * eventType = Q|C
 * result = only for click event
 * eventSource = search|suggest api
 * searchInput = `voice`|`url`|`keyboard`
 * eventCategory: Typically the object that was interacted with (e.g. 'Video')
 * eventAction: The type of interaction (e.g. 'play')
 * eventLabel: Useful for categorizing events (e.g. 'Fall Campaign')
 * eventValue: A numeric value associated with the event (e.g. 42)
 */

var debounceLog = exports.debounceLog = (0, _utilities.debounce)(submitLog, 1000);

function log(params) {
  /* If log is called with no arguments */
  if (!params) throw new Error('Invalid: log was called with no arguments');

  var eventType = params.eventType,
      _params$debounce = params.debounce,
      debounce = _params$debounce === undefined ? false : _params$debounce,
      rest = (0, _objectWithoutProperties3['default'])(params, ['eventType', 'debounce']);
  /* If not event type is specified */

  if (!eventType) throw new Error('Invalid: eventType is required');
  return function (dispatch, getState) {
    var state = getState();
    if (debounce) {
      return debounceLog((0, _extends3['default'])({ dispatch: dispatch, state: state, eventType: eventType }, rest));
    }
    return submitLog((0, _extends3['default'])({ dispatch: dispatch, state: state, eventType: eventType }, rest));
  };
}

/**
 * Log submit function
 */
function submitLog(args) {
  var dispatch = args.dispatch,
      state = args.state,
      rest = (0, _objectWithoutProperties3['default'])(args, ['dispatch', 'state']);

  dispatch((0, _extends3['default'])({
    log: true,
    type: 'SEND_LOG',
    state: state
  }, rest));
  /* Check if the user is new User */
  if (state.Context.isNewUser) {
    /* Set new user flag to false */
    _storage2['default'].cookies.set((0, _utilities.getKey)(_Settings.USER_NEW_KEY, state.AppState.namespace), false, _Settings.USER_SESSION_EXPIRY_DAYS);
    dispatch({
      type: _ActionTypes2['default'].SET_NEW_USER_STATUS,
      isNewUser: false
    });
  }
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounceLog = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.log = log;

var _utilities = require('./../utilities');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
      rest = _objectWithoutProperties(params, ['eventType', 'debounce']);
  /* If not event type is specified */


  if (!eventType) throw new Error('Invalid: eventType is required');
  return function (dispatch, getState) {
    var state = getState();
    if (debounce) {
      return debounceLog(_extends({ dispatch: dispatch, state: state, eventType: eventType }, rest));
    }
    return submitLog(_extends({ dispatch: dispatch, state: state, eventType: eventType }, rest));
  };
}

/**
 * Log submit function
 */
function submitLog(args) {
  var dispatch = args.dispatch,
      state = args.state,
      rest = _objectWithoutProperties(args, ['dispatch', 'state']);

  return dispatch(_extends({
    log: true,
    type: 'SEND_LOG',
    state: state
  }, rest));
}
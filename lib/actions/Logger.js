'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounceLog = undefined;
exports.log = log;

var _utilities = require('./../utilities');

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

  var eventType = params.eventType;
  var _params$debounce = params.debounce;
  var debounce = _params$debounce === undefined ? false : _params$debounce;

  var rest = require('../../.babelhelper.js').objectWithoutProperties(params, ['eventType', 'debounce']);
  /* If not event type is specified */


  if (!eventType) throw new Error('Invalid: eventType is required');
  return function (dispatch, getState) {
    var state = getState();
    if (debounce) {
      return debounceLog(require('../../.babelhelper.js')['extends']({ dispatch: dispatch, state: state, eventType: eventType }, rest));
    }
    return submitLog(require('../../.babelhelper.js')['extends']({ dispatch: dispatch, state: state, eventType: eventType }, rest));
  };
}

/**
 * Log submit function
 */
function submitLog(args) {
  var dispatch = args.dispatch;
  var state = args.state;

  var rest = require('../../.babelhelper.js').objectWithoutProperties(args, ['dispatch', 'state']);

  dispatch(require('../../.babelhelper.js')['extends']({
    log: true,
    type: 'SEND_LOG',
    state: state
  }, rest));
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var debounceLog = (0, _utilities.debounce)(submitLog, 1000);

function log(_ref) {
  var eventType = _ref.eventType;
  var _ref$debounce = _ref.debounce;
  var debounce = _ref$debounce === undefined ? false : _ref$debounce;

  var rest = require('../../.babelhelper.js').objectWithoutProperties(_ref, ['eventType', 'debounce']);

  return function (dispatch, getState) {
    if (debounce) {
      return debounceLog(require('../../.babelhelper.js')['extends']({ dispatch: dispatch, getState: getState, eventType: eventType }, rest));
    }
    return submitLog(require('../../.babelhelper.js')['extends']({ dispatch: dispatch, getState: getState, eventType: eventType }, rest));
  };
}

/**
 * Log submit function
 */
function submitLog(args) {
  var dispatch = args.dispatch;
  var getState = args.getState;

  var rest = require('../../.babelhelper.js').objectWithoutProperties(args, ['dispatch', 'getState']);

  dispatch(require('../../.babelhelper.js')['extends']({
    log: true,
    type: 'SEND_LOG',
    state: getState()
  }, rest));
}
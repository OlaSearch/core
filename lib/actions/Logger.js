'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;

var _utilities = require('./../utilities');

/**
 * Ola Logger Middleware intercepts this dispatch event and calls the loggerService
 */

var debounceLogger = (0, _utilities.debounce)(submitLog, 1000);

function log(eventType, result, eventSource) {
  return function (dispatch, getState) {
    switch (eventType) {
      case 'C':
        // Click event
        submitLog(dispatch, getState, eventType, result, eventSource);
        break;

      default:
        debounceLogger(dispatch, getState, eventType, result, eventSource);
        break;
    }
  };
}

/**
 * Log submit function
 */
function submitLog() {
  var _arguments = Array.prototype.slice.call(arguments);

  var dispatch = _arguments[0];
  var getState = _arguments[1];
  var eventType = _arguments[2];
  var result = _arguments[3];
  var eventSource = _arguments[4];

  dispatch({
    log: true,
    type: 'SEND_LOG',
    eventType: eventType,
    result: result,
    eventSource: eventSource,
    state: getState()
  });
}
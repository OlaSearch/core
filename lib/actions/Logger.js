'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.log = log;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Tracks
 *
 * 1. Search results - Success
 * 2. Zero results
 * 3. Zero results with suggested Term
 * 4. 
 *
 * Sample Requests
var data = {
    userid: null,
    username: null,
    history: history.slice(0, 5),
    query: q,
    ...facets,
    page: page,
    suggested_term: suggestedTerm,
    qt,
    total_results: totalResults,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    appCodeName: navigator.appCodeName,
    appName: navigator.appName,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    devicePixelRatio: window.devicePixelRatio,
    clientHeight: document.documentElement.clientHeight,
    clientWidth: document.documentElement.clientWidth
}
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.log = log;

var _utilities = require('./../utilities');

/**
 * Tracks
 *
 * 1. Search results - Success
 * 2. Zero results
 * 3. Zero results with suggested Term
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
  var _arguments = arguments;

  var _arguments2 = _slicedToArray(_arguments, 5);

  var dispatch = _arguments2[0];
  var getState = _arguments2[1];
  var eventType = _arguments2[2];
  var result = _arguments2[3];
  var eventSource = _arguments2[4];


  dispatch({
    log: true,
    type: 'SEND_LOG',
    eventType: eventType,
    result: result,
    eventSource: eventSource,
    state: getState()
  });
}
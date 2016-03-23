import types from './../constants/ActionTypes';
import { debounce } from './../utilities';

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


var debounceLogger = debounce(submitLog, 1000);

export function log(eventType, result, eventSource) {

    return (dispatch, getState) => {

        switch (eventType) {

            case 'C': // Click event
                submitLog(dispatch, getState, eventType, result, eventSource)
                break;

            default:
                debounceLogger(dispatch, getState, eventType, result, eventSource);
                break
        }

    }
}

/**
 * Log submit function 
 */
function submitLog() {

    var [dispatch, getState, eventType, result, eventSource] = arguments;

    dispatch({
        log: true,
        type: 'SEND_LOG',
        eventType: eventType,
        result,
        eventSource,
        state: getState()
    })
}
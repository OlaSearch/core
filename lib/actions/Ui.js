'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleSidebar = toggleSidebar;
exports.toggleView = toggleView;
exports.hideSearchHelp = hideSearchHelp;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function toggleSidebar() {
  return {
    type: _ActionTypes2['default'].TOGGLE_SIDEBAR
  };
}

/* Change view */
function toggleView(view) {
  return {
    type: _ActionTypes2['default'].CHANGE_VIEW,
    view: view
  };
}

/* Search help */
function hideSearchHelp() {
  return {
    type: _ActionTypes2['default'].HIDE_SEARCH_HELP
  };
}
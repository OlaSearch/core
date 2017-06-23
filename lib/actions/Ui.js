'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleSidebar = toggleSidebar;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function toggleSidebar() {
  return {
    type: _ActionTypes2['default'].TOGGLE_SIDEBAR
  };
}
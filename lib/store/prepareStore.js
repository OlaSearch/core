'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareUserState = undefined;

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

var _utilities = require('./../utilities');

var _sessionStorage = require('./../services/sessionStorage');

var _sessionStorage2 = _interopRequireDefault(_sessionStorage);

var _Settings = require('./../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var prepareUserState = exports.prepareUserState = function prepareUserState(_ref) {
  var config = _ref.config;

  /* Create user cookie */
  var userSession = _storage2['default'].cookies.get(_Settings.USER_SESSION_KEY, config.namespace);
  var isNewUser = _storage2['default'].cookies.get(_Settings.USER_NEW_KEY, config.namespace);

  /* Check for user session */
  if (userSession === null || userSession === undefined) {
    userSession = (0, _utilities.uuid)();
    _storage2['default'].cookies.set((0, _utilities.getKey)(_Settings.USER_SESSION_KEY, config.namespace), userSession, _Settings.USER_SESSION_EXPIRY_DAYS);
  }
  /* Check if the user is a new user */
  if (isNewUser === null || isNewUser === undefined) {
    isNewUser = true;
    /* Set new user flag */
    _storage2['default'].cookies.set((0, _utilities.getKey)(_Settings.USER_NEW_KEY, config.namespace), isNewUser, _Settings.USER_SESSION_EXPIRY_DAYS);
  }

  /**
   * searchSession
   * Session storage
   */
  var searchSession = _sessionStorage2['default'].getItem((0, _utilities.getKey)(_Settings.SEARCH_SESSION_KEY, config.namespace));
  if (searchSession === null || searchSession === undefined) {
    searchSession = (0, _utilities.uuid)();
    _sessionStorage2['default'].setItem((0, _utilities.getKey)(_Settings.SEARCH_SESSION_KEY, config.namespace), searchSession);
  }

  return {
    searchSession: searchSession,
    userSession: userSession,
    isNewUser: isNewUser
  };
};
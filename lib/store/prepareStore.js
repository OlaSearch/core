'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareStoreState = prepareStoreState;

var _storage = require('./../services/storage');

var _utilities = require('./../utilities');

var _sessionStorage = require('./../services/sessionStorage');

var _sessionStorage2 = _interopRequireDefault(_sessionStorage);

var _Settings = require('./../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function prepareStoreState(_ref) {
  var config = _ref.config;

  /* Create user cookie */
  var userSession = _storage.cookies.get(_Settings.USER_SESSION_KEY, config.namespace);
  var isNewUser = _storage.cookies.get(_Settings.USER_NEW_KEY, config.namespace);
  var isNewSession = false;
  var storeState = (0, _storage.get)(_Settings.OLA_STORAGE_KEY, config.namespace) || {};
  var contextState = _storage.cookies.get(_Settings.CONTEXT_STORAGE_KEY, config.namespace) || {};
  var locale = _storage.cookies.get(_Settings.LOCALE_STORAGE_KEY, config.namespace) || _Settings.DEFAULT_LOCALE;
  var botState = (0, _storage.get)(_Settings.BOT_STORAGE_KEY, config.namespace);
  var perPage = config.perPage,
      allowedCharacters = config.allowedCharacters,
      replaceQueryParamName = config.replaceQueryParamName,
      sidebar = config.sidebar,
      layoutSwitching = config.layoutSwitching,
      filterInAutoComplete = config.filterInAutoComplete;


  if (typeof contextState === 'string') {
    try {
      contextState = JSON.parse(decodeURIComponent(contextState));
    } catch (e) {
      contextState = {};
    }
  }

  /* Cast isNewUser to Boolean */
  if (typeof isNewUser === 'string') {
    isNewUser = isNewUser === 'true';
  }

  /* Check for user session */
  if (userSession === null || userSession === undefined) {
    userSession = (0, _utilities.uuid)();
    _storage.cookies.set((0, _utilities.getKey)(_Settings.USER_SESSION_KEY, config.namespace), userSession, _Settings.USER_SESSION_EXPIRY_DAYS);
  }
  /* Check if the user is a new user */
  if (isNewUser === null || isNewUser === undefined) {
    isNewUser = true;
    /* Set new user flag */
    _storage.cookies.set((0, _utilities.getKey)(_Settings.USER_NEW_KEY, config.namespace), isNewUser, _Settings.USER_SESSION_EXPIRY_DAYS);
  }

  /**
   * SearchSession:
   * isNewSession ?
   * Session storage
   */
  var searchSession = _sessionStorage2['default'].getItem((0, _utilities.getKey)(_Settings.SEARCH_SESSION_KEY, config.namespace));
  if (searchSession === null || searchSession === undefined) {
    isNewSession = true;
    searchSession = (0, _utilities.uuid)();
    try {
      _sessionStorage2['default'].setItem((0, _utilities.getKey)(_Settings.SEARCH_SESSION_KEY, config.namespace), searchSession);
    } catch (err) {
      console.warn(err);
    }
  }

  return {
    searchSession: searchSession,
    userSession: userSession,
    isNewUser: isNewUser,
    isNewSession: isNewSession,
    storeState: storeState,
    contextState: contextState,
    locale: locale,
    /**
     * Only for initial rehydration. Do not store config variables in state
     */
    configState: {
      perPage: perPage,
      allowedCharacters: allowedCharacters,
      replaceQueryParamName: replaceQueryParamName,
      sidebar: sidebar,
      layoutSwitching: layoutSwitching,
      filterInAutoComplete: filterInAutoComplete
    },
    botState: botState
  };
}
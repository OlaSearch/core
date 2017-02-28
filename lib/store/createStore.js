'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _reducers = require('./../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _createOlaMiddleware = require('./../middleware/createOlaMiddleware');

var _createOlaMiddleware2 = _interopRequireDefault(_createOlaMiddleware);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _utilities = require('./../utilities');

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

var _Settings = require('./../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Signature
 * createStore(
 *   config,
 *   searchProvider,
 *   reducers,
 *   middlewares,
 *   Store enhancers
 * )
 */

module.exports = function (config, searchProvider) {
  var reducers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var middlewares = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var enhancers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  if (!config) {
    throw new Error('Invalid: Could not find config while creating store in `createStore`');
  }
  if (!searchProvider) {
    throw new Error('Invalid: Could not find searchProvider while creating store in `createStore`');
  }
  /* Options that should be passed to OlaProvider */
  var Parser = searchProvider.Parser,
      QueryBuilder = searchProvider.QueryBuilder,
      Http = searchProvider.Http;


  if (!Parser || !QueryBuilder || !Http) {
    throw new Error('Invalid: Search adapters must contain Parser, QueryBuilder and Http functions');
  }
  var options = {
    config: config,
    parser: new Parser(config), /* For olaMiddleware */
    queryBuilder: new QueryBuilder(config), /* For olaMiddleware */
    searchService: new Http(config) /* For olaMiddleware */
  };
  var olaMiddleWare = (0, _createOlaMiddleware2['default'])(options);

  /* Reducer */
  var olaReducers = (0, _redux.combineReducers)(_extends({}, _reducers2['default'], reducers));

  /* Store */
  var store;

  if (process.env.NODE_ENV === 'production') {
    store = (0, _redux.createStore)(olaReducers, _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, [_reduxThunk2['default'], olaMiddleWare].concat(_toConsumableArray(middlewares)))].concat(_toConsumableArray(enhancers))));
  } else {
    var createLogger = require('redux-logger');
    var logger = createLogger({
      collapsed: true,
      duration: true
    });
    store = (0, _redux.createStore)(olaReducers, _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, [_reduxThunk2['default'], olaMiddleWare, logger].concat(_toConsumableArray(middlewares))), window.devToolsExtension ? window.devToolsExtension() : function (f) {
      return f;
    }].concat(_toConsumableArray(enhancers))));
  }

  /* Create user cookie */
  var userSession = _storage2['default'].cookies.get(_Settings.USER_SESSION_KEY, config.namespace);
  var isNewUser = false;
  if (!userSession) {
    isNewUser = true;
    userSession = (0, _utilities.uuid)();
    _storage2['default'].cookies.set((0, _utilities.getKey)(_Settings.USER_SESSION_KEY, config.namespace), userSession, _Settings.USER_SESSION_EXPIRY_DAYS);
  }

  /**
   * Rehydrate store
   */
  store.dispatch({
    type: _ActionTypes2['default'].OLA_REHYDRATE,
    namespace: config.namespace,
    isNewUser: isNewUser,
    projectId: config.projectId,
    env: config.env
  });

  return store;
};
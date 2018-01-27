'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports['default'] = function (config, searchProvider) {
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
    parser: new Parser(config) /* For olaMiddleware */
    , queryBuilder: new QueryBuilder(config) /* For olaMiddleware */
    , searchService: new Http(config) /* For olaMiddleware */
  };
  var namespace = config.namespace,
      env = config.env,
      projectId = config.projectId,
      filters = config.filters;

  var olaMiddleWare = (0, _createOlaMiddleware2['default'])(options);
  var persistMiddleware = (0, _createPersistMiddleware2['default'])({ namespace: namespace });

  /* Reducer */
  var olaReducers = (0, _redux.combineReducers)((0, _extends3['default'])({}, _reducers2['default'], reducers));

  /* Store */
  var store;

  if (process.env.NODE_ENV === 'production') {
    store = (0, _redux.createStore)(olaReducers, _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, [_reduxThunk2['default'], olaMiddleWare, persistMiddleware].concat(middlewares))].concat(enhancers)));
  } else {
    var _require = require('redux-logger'),
        createLogger = _require.createLogger;

    var logger = createLogger({
      collapsed: true,
      duration: true
    });
    store = (0, _redux.createStore)(olaReducers, _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, [_reduxThunk2['default'], olaMiddleWare, persistMiddleware, logger].concat(middlewares))].concat(enhancers)));
  }

  var _prepareUserState = (0, _prepareStore.prepareUserState)({
    config: config
  }),
      userSession = _prepareUserState.userSession,
      searchSession = _prepareUserState.searchSession,
      isNewUser = _prepareUserState.isNewUser,
      rest = (0, _objectWithoutProperties3['default'])(_prepareUserState, ['userSession', 'searchSession', 'isNewUser']);

  /**
   * Rehydrate store
   */


  store.dispatch((0, _extends3['default'])({
    type: _ActionTypes2['default'].OLA_REHYDRATE,
    namespace: namespace,
    isNewUser: isNewUser,
    projectId: projectId,
    searchSession: searchSession,
    userSession: userSession,
    env: env
  }, rest));

  /**
   * Do we need to add any filters
   */
  if (filters && filters.length) {
    for (var i = 0, len = filters.length; i < len; i++) {
      var selected = filters[i].selected;

      store.dispatch((0, _Search.addFilter)({ filter: filters[i], selected: selected }));
    }
  }

  return store;
};

var _redux = require('redux');

var _reducers = require('./../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _createOlaMiddleware = require('./../middleware/createOlaMiddleware');

var _createOlaMiddleware2 = _interopRequireDefault(_createOlaMiddleware);

var _createPersistMiddleware = require('./../middleware/createPersistMiddleware');

var _createPersistMiddleware2 = _interopRequireDefault(_createPersistMiddleware);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _prepareStore = require('./prepareStore');

var _Search = require('./../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }